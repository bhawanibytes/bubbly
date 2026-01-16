import uWS from "uWebSockets.js"
import { env } from "@configs/env.config"
import logger from "@configs/logger.config"
import getCORSHeaders from "@utils/getCorsHeaders"
import registerChatRoutes from "@routes/chat.route"
import registerAuthRoutes from "@routes/auth.route"
import registerUserRoutes from "@routes/user.route"
import registerContactRoutes from "@routes/contact.route"
import registerSettingRoutes from "@routes/setting.route"
import registerMessageRoutes from "./routes/message.route"
import registerIntegrationRoutes from "@routes/integration.routes"

const port = env.SERVER_PORT
const app = uWS.App()

// handle cors; write cors headers to preflight iteratively
app.options("/*", (res, req) => {
    const corsHeaders = getCORSHeaders(req)
    for (const key in corsHeaders) {
        res.writeHeader(key, corsHeaders[key])
    }
    res.writeStatus("204 No Content").end()
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
            " You are connected to serrver with this socket:" +
                JSON.stringify(ws),
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

app.any("/", (res, req) => {
    const query = req.getQuery()
    const params = new URLSearchParams(query)

    const redirectUrl = params.get("from") || env.FRONTEND_URL

    res.writeHeader("Content-Type", "text/html")
    res.end(`<body style="background:#0d1117;color:#c9d1d9;font-family:monospace;padding:20px">
  Thanks for waking up the backend. Now you can use Bubbly.
  <a href="${redirectUrl}" style="color:#58a6ff">Go back to Bubbly</a></body>`)
})

// register all routes
registerAuthRoutes(app)
registerChatRoutes(app)
registerUserRoutes(app)
registerMessageRoutes(app)
registerContactRoutes(app)
registerSettingRoutes(app)
registerIntegrationRoutes(app)
// register all routes

// catch all unmatched or bad req
app.any("/*", (res, req) => {
    req
    res.end("notthing to see here")
})

// port and server config
app.listen(port, (token) => {
    if (token) {
        logger.info(`Listening to port ${port}`)
    } else {
        logger.error(`Failed to listen to port ${port}`)
    }
})

export default app
