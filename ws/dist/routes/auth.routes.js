import { forgetPasscode, login, signup, } from "../controllers/auth.controllers.js";
import { withParsedJson } from "../utils/json.body.js";
export function registerAuthRoutes(app) {
    app.post("/signup", withParsedJson(signup));
    app.get("/login", withParsedJson(login));
    app.get("/forget-passcode", withParsedJson(forgetPasscode));
}
