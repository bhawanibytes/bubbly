import { eq, sql } from "drizzle-orm";
import { db } from "../db/db.js";
import { users } from "../db/schema/users.js";
import { UWSReq, UWSRes } from "../types/types.uws.js";

interface SignupBody {
  name: string;
  number: string;
}

export async function signup(body: SignupBody, req: UWSReq, res: UWSRes) {
  try {
    const { name, number } = body;
    if (!name || !number) {
      console.log("arg issue");
      return { status: "failed", message: "all arg required" };
    } else {
      const userExists = await db
        .select()
        .from(users)
        .where(eq(users.number, number));
      if (userExists.length > 0) {
        return { status: "failed", message: "user already exists" };
      } else {
        const [insertedUser] = await db
          .insert(users)
          .values({
            name,
            number,
          })
          .returning({ id: users.number });
        if (insertedUser.id == number) {
          return { status: "OK", message: "You signed up" };
        } else {
          return { status: "Failed", message: "Something wrong while saving" };
        }
      }
    }
  } catch (error) {
    return { status: "failed", message: error };
  }
}

export async function login(body: any, req: UWSReq, res: UWSRes) {
  try {
    const { number } = body;
    console.log(number)
    if (!number) {
      return { status: "failed", message: "all arg required" };
    } else {
      const [result] = await db
        .select()
        .from(users)
        .where(eq(users.number, number));
      if (number == result.number) {
        return { status: "OK", message: "logged in" };
      }
    }
  } catch (error) {
    return { status: "failed", message: error };
  }
}

export function forgetPasscode(body: any, req: UWSReq, res: UWSRes) {
  // ...
}
