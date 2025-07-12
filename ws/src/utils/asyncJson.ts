import { Result } from "../types/types.res.js";
import { UWSReq, UWSRes } from "../types/types.uws.js";

export default function safeAsynceJson<T = any>(
  handler: (res: UWSRes, req: UWSReq, body: T) => Promise<Result>,
) {
  return (res: UWSRes, req: UWSReq) => {
    let aborted = false;
    let buffer = Buffer.alloc(0);
    res.onAborted(() => {
      aborted = true;
      console.warn("⚠️ Request aborted by client");
    });
    res.onData((ab, isLast) => {
      // stores ArrayBuffer
      let chunk = Buffer.from(ab);
      buffer = Buffer.concat([buffer, chunk]);
      if (isLast) {
        let body: T;
        //parse body from buffer
        try {
          body = JSON.parse(buffer.toString());
        } catch (error) {
          res.writeStatus("400 Bad Request").end("Invalid JSON");
          return;
        }
        // calls handler with body, IIFE
        (async () => {
          try {
            const result = await handler(res, req, body);
            if (aborted || !result) return;
            // write all header and json response in batch
            res.cork(() => {
              res.writeHeader("Content-Type", "application/json");
              if (result.headers) {
                for (const key in result.headers) {
                  res.writeHeader(key, result.headers[key]);
                }
                delete result.headers;
              }
              res.writeStatus(result.status);
              res.end(JSON.stringify(result));
            });
          } catch (err) {
            console.error("❌ Handler error:", err);
            if (!aborted) {
              res.cork(() => {
                res.writeStatus("500 Internal Server Error");
                res.end(
                  JSON.stringify({
                    success: false,
                    status: "500 Internal Server Error",
                    message: "Internal Server Error",
                  } as Result),
                );
              });
            }
          }
        })();
      }
    });
  };
}
