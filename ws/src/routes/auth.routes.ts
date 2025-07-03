import {
  forgetPasscode,
  login,
  signup,
} from "../controllers/auth.controllers.js";
import { AppType } from "../types/types.uws.js";
import { withParsedJson } from "../utils/json.body.js";

export function registerAuthRoutes(app: AppType) {
  app.post("/signup", withParsedJson(signup));
  app.get("/login", withParsedJson(login));
  app.get("/forget-passcode", withParsedJson(forgetPasscode));
}