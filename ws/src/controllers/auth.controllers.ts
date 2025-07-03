import { UWSReq, UWSRes } from "../types/types.uws.js";

interface SignupBody {
  name: string;
  number: number;
}

export function signup(body: SignupBody, req: UWSReq, res: UWSRes) {
  const { name, number } = body;

  res.writeHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ status: "OK", received: { name, number } }));
}

export function login(body: any, req: UWSReq, res: UWSRes) {
  // ...
}

export function forgetPasscode(body: any, req: UWSReq, res: UWSRes) {
  // ...
}
