import {
  fetchAllChatsAndMessages,
  fetchMessages,
  sendDM,
} from "@/controllers/message.controllers"
import { AppType } from "../types/type.uws"
import authMiddleware from "@middlewares/auth.middleware"
import wrapper from "@wrappers/asyncJsonCorsMiddleware.wrapper"
import asyncCorsMiddlewareWrapper from "@/wrappers/asyncCorsMiddleware.wrapper"

export default function registerMessageRoutes(app: AppType) {
  app.get(
    "/all-chat-message",
    authMiddleware(asyncCorsMiddlewareWrapper(fetchAllChatsAndMessages)),
  )
  app.post("/fetch-messages", authMiddleware(wrapper(fetchMessages)))
  app.post("/send-dm", authMiddleware(wrapper(sendDM)))
}
