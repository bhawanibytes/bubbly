import { AppType } from "../types/type.uws"
import authMiddleware from "@middlewares/auth.middleware"
import asyncCorsJsonMiddlewareWrapper from "@/wrappers/asyncJsonCorsMiddleware.wrapper"

import { userExists } from "@controllers/users.controllers"

export default function registerUserRoutes(app: AppType) {
    app.post(
        "/user/available",
        authMiddleware(asyncCorsJsonMiddlewareWrapper(userExists)),
    )
}
