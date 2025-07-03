// types.ts
import uWS from 'uWebSockets.js';

export type AppType = ReturnType<typeof uWS.App>;
type GetHandler = Parameters<Parameters<AppType['any']>[1]>;

export type UWSRes = GetHandler[0];
export type UWSReq = GetHandler[1];