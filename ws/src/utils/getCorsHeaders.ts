import { UWSReq } from "../types/type.uws"
import { frontendUrl } from "../configs/env.config"

export default function getCorsHeaders(req: UWSReq) {
  const origin = req.getHeader("origin")
  const allowedOrigins = [frontendUrl]
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  }
  if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin
  }
  return headers
}
