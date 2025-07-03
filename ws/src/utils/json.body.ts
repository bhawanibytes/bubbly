import { UWSReq, UWSRes } from "../types/types.uws.js";


export function withParsedJson<T = any>(
  handler: (body: T, req: UWSReq, res: UWSRes) => void
) {
  return (res: UWSRes, req: UWSReq) => {
    const chunks: Buffer[] = [];

    res.onData((ab, isLast) => {
      chunks.push(Buffer.from(ab));
      if (isLast) {
        try {
          const body = JSON.parse(Buffer.concat(chunks).toString()) as T;
          handler(body, req, res);
        } catch (err) {
          res.writeStatus('400 Bad Request').end('Invalid JSON');
        }
      }
    });

    // ✅ This is required to avoid crash if client closes connection before sending body
    res.onAborted(() => {
      console.warn('⚠️ Request aborted by client');
    });
  };
}
