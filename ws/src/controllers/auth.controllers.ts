import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { users } from "../db/schema/users.js";
import { UWSReq, UWSRes } from "../types/types.uws.js";
import { jsonBody } from "../utils/jsonBody.js";

interface TypeBody {
  name: string;
  number: string;
}

export async function signup( res: UWSRes, req: UWSReq ) {
  try {
    const body =  await jsonBody(res) as unknown as TypeBody;
    const { name, number } = body
    if (!name || !number) {
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

export async function login(res: UWSRes, req: UWSReq ) {
  try {
    const body = await jsonBody(res) as unknown as TypeBody;
    const { number } = body;
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

export async function forgetPasscode(res: UWSRes, req: UWSReq) {
  // ...
}
