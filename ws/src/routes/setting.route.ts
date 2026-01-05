import { AppType } from "../types/type.uws"
import authMiddleware from "@middlewares/auth.middleware"
import wrapper from "@wrappers/asyncJsonCorsMiddleware.wrapper"
import asyncCorsMiddlewareWrapper from "@/wrappers/asyncCorsMiddleware.wrapper"
import { contactIntegrationDetails } from "@controllers/setting.controllers"

export default function registerSettingRoutes(app: AppType) {
    app.get(
        "/settings/contacts-details",
        authMiddleware(asyncCorsMiddlewareWrapper(contactIntegrationDetails)),
    )
    // app.post("/fetch-messages", authMiddleware(wrapper(fetchMessages)))
    // app.post("/send-dm", authMiddleware(wrapper(sendDM)))
}
