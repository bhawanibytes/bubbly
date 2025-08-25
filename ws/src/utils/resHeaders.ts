import { UWSRes } from "../types/type.uws"
import Response from "../types/type.response"

export default function resHeaders(
  res: UWSRes,
  response: Response,
  corsHeaders: Record<string, string>,
) {
  // write status code
  res.writeStatus(response?.status ?? "200 OK")
  res.writeHeader("Content-Type", "application/json")
  // write cors headers
  for (const key in corsHeaders) {
    res.writeHeader(key, corsHeaders[key])
  }
  // write headers from controllers
  if (response.headers) {
    for (const key in response.headers) {
      if (Array.isArray(response.headers[key])) {
        response.headers[key].forEach((v) => {
          res.writeHeader(key, v)
        })
      } else {
        res.writeHeader(key, response.headers[key])
      }
    }
    delete response.headers
  }
  delete response.status
}
