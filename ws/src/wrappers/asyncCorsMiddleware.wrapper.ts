import logger from "@configs/logger.config"
import Response from "@shared/types/response.type"
import { UWSReq, UWSRes } from "@/types/type.uws"
import getCorsHeaders from "@/utils/getCorsHeaders"
import resHeaders from "@utils/writeResHeaders"

// handle Async calls, Extract Json Body, Handle Cors Headers, Support middleware
export default function asyncCorsMiddlewareWrapper<T = any>(
  handler: (res: UWSRes, req: UWSReq) => Promise<Response>,
) {
  return (res: UWSRes, req: UWSReq) => {
    const corsHeaders = getCorsHeaders(req)
    let aborted = false
    // let buffer = Buffer.alloc(0)
    res.onAborted(() => {
      aborted = true
      logger.warn("⚠️ Request aborted by client")
    })
    ;(async () => {
      try {
        console.log("wrapper")
        const response = await handler(res, req)
        if (aborted || !response) return
        // write all header and json response in batch
        res.cork(() => {
          // write headers
          resHeaders(res, response, corsHeaders)
          // write response
          res.end(JSON.stringify(response))
        })
      } catch (err) {
        logger.error(`❌ Handler error: ${err}`)
        if (!aborted) {
          res.cork(() => {
            res.writeStatus("500 Internal Server Error")
            res.end(
              JSON.stringify({
                success: false,
                status: "500 Internal Server Error",
                message: "Internal Server Error",
              } as Response),
            )
          })
        }
      }
    })()
  }
}
