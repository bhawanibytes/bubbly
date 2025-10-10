import { AppType } from "../types/type.uws"
import {
  createDmChat,
  fetchChats,
  // sendDm,
} from "@controllers/chats.controllers"
import authMiddleware from "@middlewares/auth.middleware"
import wrapper from "@wrappers/asyncJsonCorsMiddleware.wrapper"
import asyncCorsMiddlewareWrapper from "@/wrappers/asyncCorsMiddleware.wrapper"

export default function registerChatRoutes(app: AppType) {
  app.post("/newchat", authMiddleware(wrapper(createDmChat)))
  app.get("/mychats", authMiddleware(asyncCorsMiddlewareWrapper(fetchChats)))
  // app.post("/send-dm", authMiddleware(wrapper(sendDm)))
  //pending
  // app.post("/delete-dm", authMiddleware(wrapper()))
}
