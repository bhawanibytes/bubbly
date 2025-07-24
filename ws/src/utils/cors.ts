import { frontendUrl } from "../configs/env.config";
import { UWSReq } from "../types/types.uws";

export function getCORSHeaders(req: UWSReq) {
  const origin = req.getHeader("origin");
  const allowedOrigins = [frontendUrl];
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}
