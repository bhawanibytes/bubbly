import { AppType } from "../types/type.uws"
import { createChat } from "../controllers/chats.controllers"
import authMiddleware from "../middlewares/auth.middleware"
import wrapper from "../wrappers/asyncJsonCorsMiddleware.wrapper"

export default function registerChatRoutes(app: AppType) {
  app.post("/newchat", authMiddleware(wrapper(createChat)))
}
