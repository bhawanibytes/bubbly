export function signup(body, req, res) {
    console.log("req came to handler");
    const { name, number } = body;
    res.writeHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "OK", received: { name, number } }));
}
export function login(body, req, res) {
    // ...
}
export function forgetPasscode(body, req, res) {
    // ...
}
