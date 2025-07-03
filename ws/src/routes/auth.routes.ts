import {
  forgetPasscode,
  login,
  signup,
} from "../controllers/auth.controllers.js";
import { AppType } from "../types/types.uws.js";
import { withSafeAsync } from "../utils/async.cork.js";
import { withParsedJson } from "../utils/json.body.js";

export function registerAuthRoutes(app: AppType) {
  app.post("/signup", withParsedJson(withSafeAsync(signup)));
  app.post("/login", withParsedJson(withSafeAsync(login)));
  app.post("/forget-passcode", withParsedJson(forgetPasscode));
}