export function withParsedJson(handler) {
    return (res, req) => {
        const chunks = [];
        res.onData((ab, isLast) => {
            chunks.push(Buffer.from(ab));
            if (isLast) {
                try {
                    const body = JSON.parse(Buffer.concat(chunks).toString());
                    handler(body, req, res);
                }
                catch (err) {
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
