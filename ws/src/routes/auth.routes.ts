import {
  forgetPin,
  login,
  setPin,
  signup,
  verifyForgetPin,
  verifySignup,
} from "../controllers/auth.controllers"
import { AppType } from "../types/types.uws"
import wrapper from "../wrappers/asyncJsonCorsMiddleware.wrapper"

export function registerAuthRoutes(app: AppType) {
  app.post("/signup", wrapper(signup))
  app.post("/verify-signup", wrapper(verifySignup))
  app.post("/login", wrapper(login))
  app.post("/forget-pin", wrapper(forgetPin))
  app.post("/verify-forget-pin", wrapper(verifyForgetPin))
  app.post("/set-pin", wrapper(setPin))
}
