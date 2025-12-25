import {
  googleAuth,
  googleCallback,
} from "@controllers/integration.controllers"
import { AppType } from "../types/type.uws"
import asyncCorsMiddlewareWrapper from "@wrappers/asyncCorsMiddleware.wrapper"
import authMiddleware from "@middlewares/auth.middleware"

export default function registerIntegrationRoutes(app: AppType) {
  app.get(
    "/google/auth",
    authMiddleware(asyncCorsMiddlewareWrapper(googleAuth)),
  )
  app.get("/google/callback", asyncCorsMiddlewareWrapper(googleCallback))
}
