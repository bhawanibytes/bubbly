import uWS from "uWebSockets.js";
import { registerAuthRoutes } from "./routes/auth.routes.js";

const port = 8080;

const app = uWS.App()

app.ws("/*", {
    // options
    compression: 0,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    // handlers
    open: (ws) => {
      // client subcribed to this topic "broadcast"
      ws.subscribe("broadcast");
      // console.log(JSON.stringify( ws) + ` is conneccted`)
      // console.dir(ws)
      // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ws)));
      // console.log(ws.getRemoteAddressAsText())
      ws.send(" You are connected to serrver with this socket:" +JSON.stringify( ws) )
    },
    message: (ws, message, isBinary) => {
      // broadcast the message to specific topic
      ws.publish("broadcast", message, isBinary);
    },
    drain: (ws) => {},
    close: (ws, code, message) => {
      // logic on unsubcribe
    },
  })

registerAuthRoutes(app)

// app.any("/*", (res, req) => {
//   req
//     res.end("notthing to see here");
//   })

app.listen(port, (token) => {
  if (token) {
    console.log(`Listening to port ` + port);
    // console.log('listenSocket value:', Object.keys(token));
  } else {
    console.log(`Failed to listen to port ` + port);
  }
});