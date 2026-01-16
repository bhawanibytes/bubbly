import { AppType } from "../types/type.uws"
import { createDmChat, fetchChats } from "@controllers/chats.controllers"
import authMiddleware from "@middlewares/auth.middleware"
import wrapper from "@wrappers/asyncJsonCorsMiddleware.wrapper"
import asyncCorsMiddlewareWrapper from "@/wrappers/asyncCorsMiddleware.wrapper"

export default function registerChatRoutes(app: AppType) {
    app.post("/create-dm-and-message", authMiddleware(wrapper(createDmChat)))
    app.get("/my-chats", authMiddleware(asyncCorsMiddlewareWrapper(fetchChats)))
}
