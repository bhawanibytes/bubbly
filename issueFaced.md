## UWS (µWebSockets.js)
### Headers
1. **Status Code Priority**: Status code headers must be written before any other headers (including CORS headers). Otherwise, the status code defaults to 200, even in cases of server errors (e.g., 500 Internal Server Error).
2. **Header Access**: Request headers should be accessed synchronously. Avoid accessing headers in asynchronous callbacks or direct async functions.

### JSON Body Handling
Reference: [JSON Post Example](https://github.com/uNetworking/uWebSockets.js/blob/master/examples/JsonPost.js)

## Drizzle ORM
### Foreign Key Reference Issue
Reference: [Type Issue #1607](https://github.com/drizzle-team/drizzle-orm/issues/1607)

## Redux
### Next.js Integration
Reference: [Redux with Next.js](https://redux.js.org/usage/nextjs)

## Next.js
### Environment Variables
Reference: [Environment Variables Documentation](https://nextjs.org/docs/app/guides/environment-variables)