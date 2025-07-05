import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { users } from "../db/schema/users.js";
import { UWSReq, UWSRes } from "../types/types.uws.js";
import { jsonBody } from "../utils/jsonBody.js";
import { rounds, secret } from "../configs/env.config.js";
import { Result } from "../types/type.res.js";

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

export async function signup( res: UWSRes, req: UWSReq ) {
  try {
    const body =  await jsonBody(res) as SignupBody;
    const { name, number, pin } = body

    // return if all details are not provided
    if (!name || !number || !pin) {
      return { success: false, status: "400 Bad Request",  message: "All fields required", data: null } as Result
    } 

    // check if user already exists and returns
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.number, number));
    if (userExists.length > 0) {
      return { success: false, status: "409 Conflict" ,  message: "User already exists" } as Result
    }

    // hash pin and save user to db
    const hashedPin = await bcrypt.hash(pin, rounds)
    const [insertedUser] = await db
      .insert(users)
      .values({
        name,
        number,
        pin: hashedPin,
      })
      .returning({ number: users.number })
    
    // if user saved send success else send error
    if (insertedUser.number == number) {
      return { success: true, status: "201 Created" , message: "You signed up", data: null } as Result
    } else {
      return { success: false, status: "500 Internal Server Error", message: "Something wrong while saving", data: null } as Result
    }
  } catch (error) {
    console.log(error)
    return { success: false, status: "500 Internal Server Error", message: "Something Went Wrong", error } as Result
  }
}

export async function login(res: UWSRes, req: UWSReq ) {
  try {
    const body = await jsonBody(res) as LoginBody;
    const { number, pin } = body;

    // return if all details are not provided
    if (!number || !pin) {
      return { success: false, status: "400 Bad Request", message: "All fields required", error: null } as Result
    }

    // retrieve details from db
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.number, number))

    //return if user don't exists      
    if(!result) {
      return { success: false, status: "401 Unauthorized", message: "Invalid credentials", data: null} as Result
    } 

    //match pin with hashed pin
    const pinMatch = await bcrypt.compare(pin, result?.pin)
    
    // error if pin not matched else return token
    if (!pinMatch) {
      return { 
        success: false,
        status: "401 Unauthorized",
        message: "Invalid credentials",
        error: {
          code: "INVALID_CREDENTIALS",
          details: "The username or password you entered is incorrect."
        }
      } as Result
    } else {
      const token = jwt.sign(result.id+"", secret)
      return { 
        success: true, 
        status: "200 OK"  ,
        message: "Logged in successfully", 
        data: {
          token,
          headers : {
            Authorization: `Bearer ${token}`
          },
        }
      } as Result
    }
    
  } catch (error) {
    console.log(error)
    return { success: false, message: "Something Went Wrong", error, } as Result
  }
}

export async function forgetPin(res: UWSRes, req: UWSReq) {
  try {
    const body = await jsonBody(res) as PinBody
    const { number } = body
    // return if number are not provided
    if (!number) {
      return { success: false, status: "400 Bad Request", message: "All fields required", error: null } as Result
    }

    // retrieve details from db
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.number, number))

    //return if user don't exists      
    if(!result) {
      return { success: false, status: "401 Unauthorized", message: "Invalid credentials", data: null} as Result
    }

    result.number
    
  } catch (error) {
    
  }

  // ...
}
