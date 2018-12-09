declare module 'micro' {
 import type {IncomingMessage, ServerResponse, Server} from 'http'
 declare export type RequestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
 ) => any

 declare export function run(
  req: IncomingMessage,
  res: ServerResponse,
  fn: RequestHandler,
 ): Promise<void>

 declare export function serve(fn: RequestHandler): Server
 declare export default typeof serve

 declare export function send(
  res: ServerResponse,
  code: number,
  data?: any,
 ): Promise<void>

 declare export function sendError(
  req: IncomingMessage,
  res: ServerResponse,
  info: {
   statusCode?: number,
   status?: number,
   message?: string,
   stack?: string,
  },
 ): Promise<void>

 declare export function createError(
  code: number,
  msg: string,
  orig?: Error,
 ): Error & {statusCode: number, originalError?: Error}

 declare export function buffer(
  req: IncomingMessage,
  info?: {limit?: string, encoding?: string},
 ): Promise<Buffer | string>

 declare export function text(
  req: IncomingMessage,
  info?: {limit?: string, encoding?: string},
 ): Promise<string>

 declare export function json(
  req: IncomingMessage,
  info?: {limit?: string, encoding?: string},
 ): Promise<Object>
 declare export function json<Schema>(
  req: IncomingMessage,
  info?: {limit?: string, encoding?: string},
 ): Promise<Schema>
}
