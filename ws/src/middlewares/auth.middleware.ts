import { env } from "../configs/env.config"
import { UWSReq, UWSRes } from "../types/type.uws"
import logger from "../configs/logger.config"
import cookieParser from "../utils/cookieParser"
import jwt from "jsonwebtoken"

export default function authMiddleware<T = any>(
  next: (res: UWSRes, req: UWSReq) => void,
) {
  return (res: UWSRes, req: UWSReq) => {
    try {
      const cookies = cookieParser(req)
      logger.info("cookies from auth.middleware.ts:", { cookies })
      if (!cookies.accessToken) throw new Error("Access token missing")

      const verifiedData = jwt.verify(cookies.accessToken, env.JWT_SECRET)
      logger.info(`Verified Data from auth.middleware.ts:`, { verifiedData })

      res.user = verifiedData
      // calling the next handler that is passed
      next(res, req)
    } catch (error: any) {
      logger.error(`JWT Error: ${error.message}`, error)

      if (error.name === "TokenExpiredError") {
        res.writeStatus("401 Unauthorized").end("Token expired")
      } else {
        res.writeStatus("401 Unauthorized").end("Invalid token")
      }
    }
  }
}
