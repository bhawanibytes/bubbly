import { UWSReq, UWSRes } from "../types/types.uws.js";

export function withSafeAsync(asyncHandler: (
    body: any,
    req: UWSReq,
    res: UWSRes,
    aborted: boolean
  ) => Promise<any> ) {
  return (body :any , req: UWSReq, res:UWSRes) => {
    let aborted = false;
    res.onAborted(() => {
      aborted = true;
    });

    (async () => {
      try {
        const result = await asyncHandler(body, req, res, aborted);

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
