import { UWSRes } from "../types/type.uws.js"

export function jsonBody(res: UWSRes) {
  return new Promise((reslove, reject) => {
    const chunks: Buffer[] = []
    res.onData((ab, isLast) => {
      chunks.push(Buffer.from(ab))
      if (isLast) {
        try {
          const parsedBody = JSON.parse(Buffer.concat(chunks).toString())
          console.log("par", parsedBody)
          reslove(parsedBody)
        } catch (error) {
          // res.writeStatus('400 Bad Request').end('Invalid JSON');
          reject(error)
        }
      }
    })
  })
}
