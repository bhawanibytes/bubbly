import { Result } from "../types/types.res";
import { UWSRes } from "../types/types.uws";

export default function resHeaders(
  res: UWSRes,
  result: Result,
  corsHeaders: Record<string, string>,
) {
  // write status code
  res.writeStatus(result?.status ?? "200 OK");
  res.writeHeader("Content-Type", "application/json");
  // write cors headers
  for (const key in corsHeaders) {
    res.writeHeader(key, corsHeaders[key]);
  }
  // write headers from controllers
  if (result.headers) {
    for (const key in result.headers) {
      if (Array.isArray(result.headers[key])) {
        result.headers[key].forEach((v) => {
          res.writeHeader(key, v);
        });
      } else {
        res.writeHeader(key, result.headers[key]);
      }
    }
    delete result.headers;
  }
  delete result.status;
}
