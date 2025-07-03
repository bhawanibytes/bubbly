import {
  forgetPasscode,
  login,
  signup,
} from "../controllers/auth.controllers.js";
import { AppType } from "../types/types.uws.js";
import { withSafeAsync } from "../utils/async.cork.js";

export function registerAuthRoutes(app: AppType) {
  app.post("/signup", withSafeAsync(signup));
  app.post("/login", withSafeAsync(login));
  app.post("/forget-passcode", withSafeAsync(forgetPasscode));
}