import {
  forgetPin,
  login,
  setPin,
  signup,
  verifyForgetPin,
  verifySignup,
} from "@controllers/auth.controllers"
import { AppType } from "@/types/type.uws"
import asyncJsonCorsMiddleware from "@wrappers/asyncJsonCorsMiddleware.wrapper"

export default function registerAuthRoutes(app: AppType) {
  app.post("/signup", asyncJsonCorsMiddleware(signup))
  app.post("/verify-signup", asyncJsonCorsMiddleware(verifySignup))
  app.post("/login", asyncJsonCorsMiddleware(login))
  app.post("/forget-pin", asyncJsonCorsMiddleware(forgetPin))
  app.post("/verify-forget-pin", asyncJsonCorsMiddleware(verifyForgetPin))
  app.post("/set-pin", asyncJsonCorsMiddleware(setPin))
}
