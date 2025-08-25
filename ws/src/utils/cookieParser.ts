import { UWSReq } from "../types/type.uws"

export default function cookieParser(req: UWSReq) {
  const cookieHeader = req.getHeader("cookie") || ""
  return Object.fromEntries(
    cookieHeader.split(";").map((cookie) => {
      const [k, ...v] = cookie.trim().split("=")
      return [k, v.join("=")]
    }),
  )
}
