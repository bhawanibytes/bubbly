import uWS from "uWebSockets.js"
import { registerAuthRoutes } from "@routes/auth.route"
import logger from "@configs/logger.config"
import getCORSHeaders from "@utils/getCorsHeaders"
import registerChatRoutes from "@routes/chat.route"
import registerMessageRoutes from "./routes/message.route"
import { registerIntegrationRoutes } from "@routes/integration.routes"
import { env } from "@configs/env.config"
const port = env.SERVER_PORT
const app = uWS.App()

// handle cors; write cors headers to preflight iteratively
app.options("/*", (res, req) => {
  const corsHeaders = getCORSHeaders(req)
  for (const key in corsHeaders) {
    res.writeHeader(key, corsHeaders[key])
  }
  res.end("OK")
})

// ws configs
app.ws("/*", {
  // options
  compression: 0,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 10,
  // handlers
  open: (ws) => {
    // client subcribed to this topic "broadcast"
    ws.subscribe("broadcast")
    // console.log(JSON.stringify( ws) + ` is conneccted`)
    // console.dir(ws)
    // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ws)));
    // console.log(ws.getRemoteAddressAsText())
    ws.send(
      " You are connected to serrver with this socket:" + JSON.stringify(ws),
    )
  },
  message: (ws, message, isBinary) => {
    // broadcast the message to specific topic
    ws.publish("broadcast", message, isBinary)
  },
  drain: (ws) => {},
  close: (ws, code, message) => {
    // logic on unsubcribe
  },
})

// register all routes
registerAuthRoutes(app)
registerChatRoutes(app)
registerMessageRoutes(app)
registerIntegrationRoutes(app)
//
app.post("/test", (res, req) => {
  res.writeStatus("400 Bad Request")
  res.writeHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ error: "Bad request" }))
})

// catch all unmatched or bad req
app.any("/*", (res, req) => {
  req
  res.end("notthing to see here")
})

// port and server config
app.listen(port, (token) => {
  if (token) {
    // console.log(`Listening to port ` + port);
    logger.info(`Listening to port ${port}`)
  } else {
    // console.log(`Failed to listen to port ` + port);
    logger.error(`Failed to listen to port ${port}`)
  }
})
