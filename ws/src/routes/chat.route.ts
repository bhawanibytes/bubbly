import { AppType } from "../types/type.uws"
import {
  createDmChat,
  fetchChats,
  sendDm,
} from "@controllers/chats.controllers"
import authMiddleware from "@middlewares/auth.middleware"
import wrapper from "@wrappers/asyncJsonCorsMiddleware.wrapper"

export default function registerChatRoutes(app: AppType) {
  app.post("/newchat", authMiddleware(wrapper(createDmChat)))
  app.post("/send-dm", authMiddleware(wrapper(sendDm)))
  app.get("/mychats", authMiddleware(wrapper(fetchChats)))
  //pending
  // app.post("/delete-dm", authMiddleware(wrapper()))
}
