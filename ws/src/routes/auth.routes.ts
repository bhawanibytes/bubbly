import {
  forgetPin,
  login,
  signup,
} from "../controllers/auth.controllers.js";
import { AppType } from "../types/types.uws.js";
import safeAsynceJson from "../utils/asyncJson.js";

export function registerAuthRoutes(app: AppType) {
  app.post("/signup", safeAsynceJson(signup));
  app.post("/login", safeAsynceJson(login));
  app.post("/forget-pin", safeAsynceJson(forgetPin));
}