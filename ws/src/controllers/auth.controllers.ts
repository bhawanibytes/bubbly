import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { users } from "../db/schema/users.js";
import { UWSReq, UWSRes } from "../types/types.uws.js";
import { accessExpiry, refreshExpiry, rounds, secret } from "../configs/env.config.js";
import { Result } from "../types/type.res.js";
import generateOtp from "../utils/generateOtp.js";
import sendOtp from "../configs/twilio.config.js";
import cache from "../configs/redis.config.js";

interface SignupBody {
  name: string;
  number: string;
  pin: string;
}

interface LoginBody {
  number: string;
  pin: string;
}

interface PinBody {
  number: string;
}

export async function signup(
  res: UWSRes,
  req: UWSReq,
  body: any
): Promise<any> {
  const { name, number, pin } = body as SignupBody;
  // return if any details are not provided
  if (!name || !number || !pin) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All fields required",
      data: null,
    } as Result;
  }
  try {
    // check if user already exists and verified then returns
    const [userExists] = await db
      .select()
      .from(users)
      .where(eq(users.number, number));
    if (userExists?.isVerified ) {
      return {
        success: false,
        status: "409 Conflict",
        message: "User already exists",
      } as Result;
    }
    // save user if user is not saved in db
    if (!userExists){
      // hash pin and save user to db
      const hashedPin = await bcrypt.hash(pin, rounds);
      const [insertedUser] = await db.insert(users).values({
        name,
        number,
        pin: hashedPin,
        isVerified: false,
      });
    }
    // generate otp
    const otp = generateOtp()
    //send otp
    const otpServiceRes = await sendOtp(otp, number)
    // save otp in cache
    const otpSave= await cache.set(number, otp)
    console.log(otpSave)
    // in end return the response once user is created
    return {
      success: true,
      status: "201 Created",
      message: "You signed up.",
      data: {
        otpServiceRes,
      },
    } as Result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: "500 Internal Server Error",
      message: "Something Went Wrong",
      error,
    } as Result;
  }
}

export async function verifySignup(res: UWSRes, req: UWSReq, body: any): Promise<any> {
  const { number, userOtp } = body
  // return if all details are not provided
  if (!number || !userOtp) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All fields required",
      error: null,
    } as Result;
  }
  try {
    const cachedOtp = await cache.get(number)
    console.log("cachedOtp:", cachedOtp)
    // return if otp isn't in cache
    if (!cachedOtp) {
      return {
      success: false,
      status: "404 Not Found",
      message: "Otp is not found.",
      error: null,
    } as Result;
    }
    // return if otp don't match
    if (!cachedOtp == userOtp) {
      return {
      success: false,
      status: "401 Unauthorized",
      message: "Wrong otp.",
      error: null,
    } as Result;
    }
    // save user as isVerifiedn true
    await db.update(users).set({ isVerified: true}).where(eq(users.number, number))

    // return success
    return {
      success: true,
      status: "202 Accepted",
      message: "Otp matched.",
      data: null,
    } as Result;
    
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something Went Wrong", error } as Result;
  }
}

export async function login(res: UWSRes, req: UWSReq, body: any): Promise<any> {
  const { number, pin } = body as LoginBody;

  // return if all details are not provided
  if (!number || !pin) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All fields required",
      error: null,
    } as Result;
  }
  try {
    // retrieve details from db
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.number, number));

    //return if user don't exists
    if (!result) {
      return {
        success: false,
        status: "401 Unauthorized",
        message: "Invalid credentials",
        data: null,
      } as Result;
    }

    //match pin with hashed pin
    const pinMatch = await bcrypt.compare(pin, result?.pin);

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
      } as Result;
    } else {
      const accessToken = jwt.sign(
        {
          id: result.id,
        },
        secret,
        {
          expiresIn: accessExpiry,
        }
      );
      const refreshToken = jwt.sign(
        {
          id: result.id,
        },
        secret,
        {
          expiresIn: refreshExpiry,
        }
      );
      return {
        success: true,
        status: "200 OK",
        message: "Logged in successfully",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          accessToken,
          refreshToken,
        },
      } as Result;
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something Went Wrong", error } as Result;
  }
}

export async function forgetPin(
  res: UWSRes,
  req: UWSReq,
  body: any
): Promise<any> {
  try {
    const { number } = body;
    // return if number are not provided
    if (!number) {
      return {
        success: false,
        status: "400 Bad Request",
        message: "All fields required",
        error: null,
      } as Result;
    }

    // retrieve details from db
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.number, number));

    //return if user don't exists
    if (!result) {
      return {
        success: false,
        status: "401 Unauthorized",
        message: "Invalid credentials",
        data: null,
      } as Result;
    }
    

    result.number;
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something Went Wrong", error } as Result;
  }

  // ...
}
