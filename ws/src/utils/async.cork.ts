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
            if (result?.data?.headers){
              // set headers to res if there is received any from handler
              for (const key in result?.data?.headers){
                if (Object.prototype.hasOwnProperty.call(result?.data?.headers, key)) {
                  res.writeHeader(`${key}`, `${result?.data?.headers[key]}` );
                }
              }
              // delete headers once they are attached
              delete result?.data?.headers
              
              res.writeStatus(`${result?.data?.status}`);
              res.end(JSON.stringify(result));
            } else {
              res.writeHeader("Content-Type", "application/json" );
              if (result?.data?.status) {
                res.writeStatus(result.data.status)
              }
              res.end(JSON.stringify(result));
            }
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
