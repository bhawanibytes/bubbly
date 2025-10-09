import { db } from "@db/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { eq } from "drizzle-orm"
import { users } from "@schema/users"
import cache from "@configs/cache.config"
import generateOtp from "@utils/generateOtp"
import sendOtp from "@configs/message.config"
import { UWSReq, UWSRes } from "@/types/type.uws"
import Response from "@shared/types/response.type"
import { secret, slatRounds } from "@configs/env.config"
import {
  SignupBody,
  VerifySignupBody,
  LoginBody,
  ForgetPinBody,
  VerifyForgetPinBody,
  SetPinBody,
} from "@shared/types/auth.type"
import logger from "@/configs/logger.config"

//  logout (invalidate tokens, clear sessions)
//  refreshToken (issue new JWTs securely)

// signups and send otp for verify signup
export async function signup(
  res: UWSRes,
  req: UWSReq,
  body: SignupBody,
): Promise<Response> {
  const { fullname, number, pin } = body as SignupBody
  logger.info("fullname", fullname, "number", number, "pin", pin)
  // return if any details are not provided
  if (!fullname || !number || !pin) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All fields required",
    }
  }
  try {
    // check if user already exists and verified then returns
    const [userExists] = await db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, number))
    if (userExists?.isVerified) {
      return {
        success: false,
        status: "409 Conflict",
        message: "User already exists",
      }
    }
    // save user if user is not saved in db
    if (!userExists) {
      // hash pin and save user to db
      const hashedPin = await bcrypt.hash(pin, slatRounds)
      const insertedUser = await db.insert(users).values({
        name: fullname,
        phoneNumber: number,
        pin: hashedPin,
        isVerified: false,
      })
    }
    // generate otp
    const otp = generateOtp()
    //send otp
    // const otpServiceRes = await sendOtp(otp, number);
    // save otp in cache
    const otpSave = await cache.set(`signup:${number}`, otp)
    logger.info(otpSave)
    // in end return the response once user is created
    return {
      success: true,
      status: "201 Created",
      message: "You signed up.",
      data: {
        // otpServiceRes,
        fullname,
        number,
      },
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      status: "500 Internal Server Error",
      message: "Something Went Wrong",
    }
  }
}

// verify signup by number and otp
export async function verifySignup(
  res: UWSRes,
  req: UWSReq,
  body: VerifySignupBody,
): Promise<Response> {
  const { number, otp } = body
  // return if all details are not provided
  if (!number || !otp) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All fields required",
    }
  }
  try {
    const cachedOtp = await cache.get(`signup:${number}`)
    logger.info("cachedOtp:", cachedOtp)
    // return if otp isn't in cache
    if (!cachedOtp) {
      return {
        success: false,
        status: "404 Not Found",
        message: "Otp is expired.",
      }
    }
    // return if otp don't match
    if (cachedOtp !== otp) {
      return {
        success: false,
        status: "401 Unauthorized",
        message: "Wrong otp",
      }
    }
    // save user as isVerified true
    await db
      .update(users)
      .set({ isVerified: true })
      .where(eq(users.phoneNumber, number))

    // return success
    return {
      success: true,
      status: "202 Accepted",
      message: "Otp matched.",
      data: {
        number,
      },
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      status: "500 Internal Server Error",
      message: "Something Went Wrong",
    }
  }
}

// login through number and pin
export async function login(
  res: UWSRes,
  req: UWSReq,
  body: LoginBody,
): Promise<Response> {
  const { number, pin } = body

  // return if all details are not provided
  if (!number || !pin) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All fields required",
    }
  }
  try {
    // retrieve details from db
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, number))

    //return if user don't exists or is not verified
    if (!user?.isVerified) {
      return {
        success: false,
        status: "401 Unauthorized",
        message: "Invalid credentials",
      }
    }

    //match pin with hashed pin
    const pinMatch = await bcrypt.compare(pin, user?.pin)

    // error if pin not matched else return token
    if (!pinMatch) {
      return {
        success: false,
        status: "401 Unauthorized",
        message: "Invalid credentials",
        error: {
          code: "INVALID_CREDENTIALS",
          details: "The username or password you entered is incorrect.",
        },
      }
    } else {
      const accessToken = jwt.sign(
        {
          id: user.id,
          number: user.phoneNumber
        },
        secret,
        {
          expiresIn: "1D",
        },
      )
      const refreshToken = jwt.sign(
        {
          id: user.id,
          number: user.phoneNumber
        },
        secret,
        {
          expiresIn: "7D",
        },
      )
      return {
        success: true,
        status: "200 OK",
        message: "Logged in successfully",
        headers: {
          "Set-Cookie": [
            `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${3600 * 24 * 7}`,
            `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${3600 * 24 * 7}`,
          ],
        },
        data: {
          number: user.phoneNumber,
          userId: user.id,
          accessToken,
          refreshToken,
        },
      }
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      status: "500 Internal Server Error",
      message: "Something Went Wrong",
    }
  }
}

// sent otp to reset pin
export async function forgetPin(
  res: UWSRes,
  req: UWSReq,
  body: ForgetPinBody,
): Promise<Response> {
  try {
    const { number } = body
    // return if number are not provided
    if (!number) {
      return {
        success: false,
        status: "400 Bad Request",
        message: "All fields required",
      }
    }

    // retrieve details from db
    const [userExists] = await db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, number))

    //return if user don't exists or is not verified
    if (!userExists?.isVerified) {
      return {
        success: false,
        status: "401 Unauthorized",
        message: "Invalid credentials",
      }
    }
    // genearate 6 digit otp
    const otp = generateOtp()
    // send otp to the number
    const otpServiceRes = await sendOtp(otp, number)
    // save otp to cache
    const saveOtp = await cache.set(`forgetPin:${number}`, otp)
    logger.info(saveOtp)
    // in end return the response once otp is sent
    return {
      success: true,
      status: "202 Accepted",
      message: "Otp is sent to your number.",
      data: {
        otpServiceRes,
      },
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      status: "500 Internal Server Error",
      message: "Something Went Wrong",
    }
  }
}

// verify otp before reset pin
export async function verifyForgetPin(
  res: UWSRes,
  req: UWSReq,
  body: VerifyForgetPinBody,
): Promise<Response> {
  const { number, userOtp } = body
  // return if all arg not provided
  if (!number || !userOtp) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All fields required",
    }
  }
  try {
    // return if otp didn't match and cache is not available
    const cachedOtp = await cache.get(`forgetPin:${number}`)
    if (cachedOtp !== userOtp) {
      return {
        success: false,
        status: "403 Forbidden",
        message: "Wrong Otp",
      }
    }
    // create a setPin token in cache
    await cache.set(`setPinToken:${number}`, "verified")
    // in end return the response once token is cached
    return {
      success: true,
      status: "202 Accepted",
      message: "Otp matched.",
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      status: "500 Internal Server Error",
      message: "Something Went Wrong",
    }
  }
}

// reset pin
export async function setPin(
  res: UWSRes,
  req: UWSReq,
  body: SetPinBody,
): Promise<Response> {
  const { number, userPin } = body
  if (!number || !userPin) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All fields required",
    }
  }
  try {
    const cacheToken = await cache.get(`setPinToken:${number}`)
    if (cacheToken !== "verified") {
      return {
        success: false,
        status: "401 Unauthorized",
        message: "Token is expired",
      }
    }
    // Delete the token so it can't be reused
    await cache.del(`setPinToken:${number}`)
    // update pin after hashing it
    const hashedPin = await bcrypt.hash(userPin, slatRounds)
    const [updatedUser] = await db
      .update(users)
      .set({ pin: hashedPin })
      .where(eq(users.phoneNumber, number))
    // return after pin is updated
    return {
      success: true,
      status: "202 Accepted",
      message: "Pin is reset",
      data: {
        updatedUser,
      },
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      status: "500 Internal Server Error",
      message: "Something Went Wrong",
    }
  }
}
