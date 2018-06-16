// declare var fet: typeof fetch;
// declare var req: typeof Headers;
// declare var res: typeof Headers;
// declare var headers: typeof Headers;

declare module 'cross-fetch' {
 declare export var fetch: typeof window.fetch
 declare export var Request: typeof global.Request
 declare export var Response: typeof global.Response
 declare export var Headers: typeof global.Headers
 declare export default typeof fetch
}
