import { UWSReq, UWSRes } from "../types/types.uws.js";

export function withSafeAsync(asyncHandler: (
  res: UWSRes,
  req: UWSReq,    
  ) => Promise<any> ) {
  return ( res:UWSRes, req: UWSReq) => {
    let aborted = false;
    res.onAborted(() => {
      aborted = true;
    });

    (async () => {
      try {
        const result = await asyncHandler( res, req);
        if (!aborted) {
          res.cork(() => {
            res.writeHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          });
        }
      } catch (err) {
        console.error("❌ Handler error:", err);
        if (!aborted) {
          res.cork(() => {
            res.writeStatus("500 Internal Server Error");
            res.end(JSON.stringify({ status: "failed", message: "Internal Server Error" }));
          });
        }
      }
    })();
  };
}
