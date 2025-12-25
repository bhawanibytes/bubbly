import { AppType } from "../types/type.uws"
import authMiddleware from "@middlewares/auth.middleware"
// import asyncJsonCorsMiddlewareWrapper from "@wrappers/asyncJsonCorsMiddleware.wrapper"
import asyncCorsMiddlewareWrapper from "@/wrappers/asyncCorsMiddleware.wrapper"
import { getContactRecords } from "@controllers/contact.controllers"

export default function registerContactRoutes(app: AppType) {
    app.get(
        "/fetch-contacts",
        authMiddleware(asyncCorsMiddlewareWrapper(getContactRecords)),
    )
}
