declare module 'fastify' {
  import type {
    Server as HttpServer,
    IncomingMessage,
    ServerResponse,
  } from 'http'
  import type {Readable} from 'stream'
  // declare module.exports: typeof fastify
  declare export type fastify$Plugin<
    HttpServer,
    HttpRequest,
    HttpResponse,
    T,
  > = (
    instance: fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>,
    opts: T,
    callback: (err?: Error) => void,
  ) => void

  declare export type fastify$Middleware<
    HttpServer,
    HttpRequest,
    HttpResponse,
  > = (
    req: HttpRequest,
    res: HttpResponse,
    callback: (err?: Error) => void,
  ) => void

  declare export type fastify$DefaultQuery = {
    [k: string]: any,
  }

  declare export type fastify$DefaultParams = {
    [k: string]: any,
  }

  declare export type fastify$DefaultHeaders = {
    [k: string]: any,
  }

  declare export type fastify$DefaultBody = any

  declare export type fastify$HTTPMethod =
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'OPTIONS'

  declare export type fastify$FastifyMiddleware<
    HttpServer,
    HttpRequest,
    HttpResponse,
    Query,
    Params,
    Headers,
    Body,
  > = (
    req: fastify$FastifyRequest<HttpRequest, Query, Params, Headers, Body>,
    reply: fastify$FastifyReply<HttpResponse>,
    done: (err?: Error) => void,
  ) => void

  declare export type fastify$RequestHandler<
    HttpRequest,
    HttpResponse,
    Query,
    Params,
    Headers,
    Body,
  > = (
    request: fastify$FastifyRequest<HttpRequest, Query, Params, Headers, Body>,
    reply: fastify$FastifyReply<HttpResponse>,
  ) => void | Promise<any>

  declare export type fastify$SchemaCompiler = (schema: Object) => Function

  declare export type fastify$BodyParser<HttpRequest, RawBody> =
    | ((
        req: HttpRequest,
        rawBody: RawBody,
        done: (err: Error | null, body?: any) => void,
      ) => void)
    | ((req: HttpRequest, rawBody: RawBody) => Promise<any>)

  declare export type fastify$ContentTypeParser<HttpRequest> =
    | ((
        req: HttpRequest,
        done: (err: Error | null, body?: any) => void,
      ) => void)
    | ((req: HttpRequest) => Promise<any>)

  declare export interface fastify$FastifyContext {
    config: any;
  }

  /**
   * fastify's wrapped version of node.js IncomingMessage
   */
  declare export interface fastify$FastifyRequest<
    HttpRequest,
    Query,
    Params,
    Headers,
    Body,
  > {
    query: Query;
    params: Params;
    headers: Headers;
    body: Body;
    id: any;
    ip: string;
    hostname: string;
    raw: HttpRequest;
    req: HttpRequest;
    // log: pino.Logger;
  }

  /**
   * Response object that is used to build and send a http response
   */
  declare export interface fastify$FastifyReply<HttpResponse> {
    code: (statusCode: number) => fastify$FastifyReply<HttpResponse>;
    status: (statusCode: number) => fastify$FastifyReply<HttpResponse>;
    header: (name: string, value: any) => fastify$FastifyReply<HttpResponse>;
    headers: (headers: {
      [key: string]: any,
    }) => fastify$FastifyReply<HttpResponse>;
    type: (contentType: string) => fastify$FastifyReply<HttpResponse>;
    redirect: (
      statusCode: number,
      url: string,
    ) => fastify$FastifyReply<HttpResponse>;
    serialize: (payload: any) => string;
    serializer: (fn: Function) => fastify$FastifyReply<HttpResponse>;
    send: (payload?: any) => fastify$FastifyReply<HttpResponse>;
    sent: boolean;
    res: HttpResponse;
    context: fastify$FastifyContext;
  }

  declare export type fastify$TrustProxyFunction = (
    addr: string,
    index: number,
  ) => boolean

  declare export interface fastify$ServerOptions {
    ignoreTrailingSlash?: boolean;
    bodyLimit?: number;
    // logger?: pino.LoggerOptions | boolean;
    trustProxy?:
      | string
      | number
      | boolean
      | Array<string>
      | fastify$TrustProxyFunction;
    maxParamLength?: number;
  }

  declare export type fastify$ServerOptionsAsSecure = {
    https: any, //http2.SecureServerOptions,
  } & fastify$ServerOptions

  declare export type fastify$ServerOptionsAsHttp = {
    http2?: false,
  } & fastify$ServerOptions

  //prettier-ignore
  declare export type fastify$ServerOptionsAsSecureHttp =
    fastify$ServerOptionsAsHttp & fastify$ServerOptionsAsSecure

  declare export type fastify$ServerOptionsAsHttp2 = {
    http2: true,
  } & fastify$ServerOptions

  //prettier-ignore
  declare export type fastify$ServerOptionsAsSecureHttp2 =
    fastify$ServerOptionsAsHttp2 & fastify$ServerOptionsAsSecure

  declare export type fastify$JSONSchema = Object

  declare export interface fastify$RouteSchema {
    body?: fastify$JSONSchema;
    querystring?: fastify$JSONSchema;
    params?: fastify$JSONSchema;
    response?: {
      // [code: number]: fastify$JSONSchema,
      [code: string]: fastify$JSONSchema,
    };
  }

  /**
   * Optional configuration parameters for the route being created
   */
  declare export interface fastify$RouteShorthandOptions<
    HttpServer,
    HttpRequest,
    HttpResponse,
    Query,
    Params,
    Headers,
    Body,
  > {
    schema?: fastify$RouteSchema;
    attachValidation?: boolean;
    beforeHandler?:
      | fastify$FastifyMiddleware<
          HttpServer,
          HttpRequest,
          HttpResponse,
          Query,
          Params,
          Headers,
          Body,
        >
      | Array<
          fastify$FastifyMiddleware<
            HttpServer,
            HttpRequest,
            HttpResponse,
            Query,
            Params,
            Headers,
            Body,
          >,
        >;
    schemaCompiler?: fastify$SchemaCompiler;
    bodyLimit?: number;
    logLevel?: string;
    config?: any;
  }

  /**
   * Route configuration options such as "url" and "method"
   */
  declare export type fastify$RouteOptions<
    HttpServer,
    HttpRequest,
    HttpResponse,
    Query,
    Params,
    Headers,
    Body,
  > = {
    method: fastify$HTTPMethod | fastify$HTTPMethod[],
    url: string,
    handler: fastify$RequestHandler<
      HttpRequest,
      HttpResponse,
      Query,
      Params,
      Headers,
      Body,
    >,
  } & fastify$RouteShorthandOptions<
    HttpServer,
    HttpRequest,
    HttpResponse,
    Query,
    Params,
    Headers,
    Body,
  >

  /**
   * Register options
   */
  declare export type fastify$RegisterOptions<
    HttpServer,
    HttpRequest,
    HttpResponse,
    Query,
    Params,
    Headers,
    Body,
  > = {
    [key: string]: any,
    prefix?: string,
  } & fastify$RouteShorthandOptions<
    HttpServer,
    HttpRequest,
    HttpResponse,
    Query,
    Params,
    Headers,
    Body,
  >

  /**
   * Fake http inject options
   */
  declare export interface fastify$HTTPInjectOptions {
    url: string;
    method?: fastify$HTTPMethod;
    authority?: string;
    headers?: /*ObjectKeyword*/ {};
    remoteAddress?: string;
    payload?: string | /*ObjectKeyword*/ {} | Buffer | Readable;
    simulate?: {
      end?: boolean,
      split?: boolean,
      error?: boolean,
      close?: boolean,
    };
    validate?: boolean;
  }

  /**
   * Fake http inject response
   */
  declare export interface fastify$HTTPInjectResponse {
    raw: {
      req: Readable,
      res: ServerResponse,
    };
    headers: /*ObjectKeyword*/ {};
    statusCode: number;
    statusMessage: string;
    payload: string;
    rawPayload: Buffer;
    trailers: /*ObjectKeyword*/ {};
  }

  /**
   * Represents the fastify instance created
   * by the factory function the module exports.
   */
  declare export interface fastify$FastifyInstance<
    HttpServer,
    HttpRequest,
    HttpResponse,
  > {
    server: HttpServer;
    // log: pino.Logger;

    /**
     * Adds a route to the server
     */
    route<Query, Params, Headers, Body>(
      opts: fastify$RouteOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a GET route with the given mount path, options, and handler
     */
    get<Query, Params, Headers, Body>(
      url: string,
      opts: fastify$RouteShorthandOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a GET route with the given mount path and handler
     */
    get<Query, Params, Headers, Body>(
      url: string,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a PUT route with the given mount path, options, and handler
     */
    put<Query, Params, Headers, Body>(
      url: string,
      opts: fastify$RouteShorthandOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a PUT route with the given mount path and handler
     */
    put<Query, Params, Headers, Body>(
      url: string,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a PATCH route with the given mount path, options, and handler
     */
    patch<Query, Params, Headers, Body>(
      url: string,
      opts: fastify$RouteShorthandOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a PATCH route with the given mount path and handler
     */
    patch<Query, Params, Headers, Body>(
      url: string,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a POST route with the given mount path, options, and handler
     */
    post<Query, Params, Headers, Body>(
      url: string,
      opts: fastify$RouteShorthandOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a POST route with the given mount path and handler
     */
    post<Query, Params, Headers, Body>(
      url: string,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a HEAD route with the given mount path, options, and handler
     */
    head<Query, Params, Headers, Body>(
      url: string,
      opts: fastify$RouteShorthandOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a HEAD route with the given mount path and handler
     */
    head<Query, Params, Headers, Body>(
      url: string,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a DELETE route with the given mount path, options, and handler
     */
    delete<Query, Params, Headers, Body>(
      url: string,
      opts: fastify$RouteShorthandOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a DELETE route with the given mount path and handler
     */
    delete<Query, Params, Headers, Body>(
      url: string,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a OPTIONS route with the given mount path, options, and handler
     */
    options<Query, Params, Headers, Body>(
      url: string,
      opts: fastify$RouteShorthandOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a OPTIONS route with the given mount path and handler
     */
    options<Query, Params, Headers, Body>(
      url: string,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a route for all the supported methods
     * with the given mount path, options, and handler
     */
    all<Query, Params, Headers, Body>(
      url: string,
      opts: fastify$RouteShorthandOptions<
        HttpServer,
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Defines a route for all the supported methods
     * with the given mount path and handler
     */
    all<Query, Params, Headers, Body>(
      url: string,
      handler: fastify$RequestHandler<
        HttpRequest,
        HttpResponse,
        Query,
        Params,
        Headers,
        Body,
      >,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Starts the server on the given port after all the plugins are loaded,
     * internally waits for the .ready() event. The callback
     * is the same as the Node core.
     */
    listen(callback: (err: Error, address: string) => void): void;
    listen(port: number, callback: (err: Error, address: string) => void): void;
    listen(
      port: number,
      address: string,
      callback: (err: Error, address: string) => void,
    ): void;
    listen(
      port: number,
      address: string,
      backlog: number,
      callback: (err: Error, address: string) => void,
    ): void;
    listen(
      sockFile: string,
      callback: (err: Error, address: string) => void,
    ): void;
    listen(port: number, address?: string, backlog?: number): Promise<string>;
    listen(sockFile: string): Promise<string>;

    /**
     * Registers a listener function that is invoked when all the plugins have
     * been loaded. It receives an error parameter if something went wrong.
     */
    ready(): Promise<
      fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>,
    >;
    ready(readyListener: (err: Error) => void): void;
    ready(readyListener: (err: Error, done: Function) => void): void;
    ready(
      readyListener: (
        err: Error,
        context: fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>,
        done: Function,
      ) => void,
    ): void;

    /**
     * Call this function to close the server instance
     * and run the "onClose" callback
     */
    close(closeListener: () => void): void;

    /**
     * Apply the given middleware to all incoming requests
     */
    use(
      middleware: fastify$Middleware<HttpServer, HttpRequest, HttpResponse>,
    ): void;

    /**
     * Apply the given middleware to routes matching the given path
     */
    use(
      path: string,
      middleware: fastify$Middleware<HttpServer, HttpRequest, HttpResponse>,
    ): void;

    /**
     * Registers a plugin
     */
    register<T>(
      plugin: fastify$Plugin<HttpServer, HttpRequest, HttpResponse, T>,
      opts?: T,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Register a callback that will be executed just after a register.
     * It can take up to three parameters
     */
    after(afterListener: (err: Error) => void): void;
    after(afterListener: (err: Error, done: Function) => void): void;
    after(
      afterListener: (
        err: Error,
        context: fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>,
        done: Function,
      ) => void,
    ): void;

    /**
     * Decorate this fastify instance with new properties.
     * Throws an execption if
     * you attempt to add the same decorator name twice
     */
    decorate(
      name: string,
      decoration: any,
      dependencies?: Array<string>,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Decorate reply objects with new properties. Throws an execption if
     * you attempt to add the same decorator name twice
     */
    decorateReply(
      name: string,
      decoration: any,
      dependencies?: Array<string>,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Decorate request objects with new properties. Throws an execption if
     * you attempt to add the same decorator name twice
     */
    decorateRequest(
      name: string,
      decoration: any,
      dependencies?: Array<string>,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Extends the standard server error. Return an object
     * with the properties you'd
     * like added to the error
     */
    extendServerError(
      extendFn: (error: Error) => Object,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Determines if the given named decorator is available
     */
    hasDecorator(name: string): boolean;

    /**
     * Determines if the given named request decorator is available
     */
    hasRequestDecorator(name: string): boolean;

    /**
     * Determines if the given named reply decorator is available
     */
    hasReplyDecorator(name: string): boolean;

    /**
     * Add a hook that is triggered when a request is initially received
     */
    addHook(
      name: 'onRequest',
      hook: fastify$Middleware<HttpServer, HttpRequest, HttpResponse>,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Hook that is fired before a request is processed,
     * but after the "onRequest" hook
     */
    addHook(
      name: 'preHandler',
      hook: fastify$FastifyMiddleware<HttpServer, HttpRequest, HttpResponse>,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Hook that is fired after a request is processed,
     * but before the "onResponse" hook
     */
    addHook(
      name: 'onSend',
      hook: (
        req: fastify$FastifyRequest<HttpRequest>,
        reply: fastify$FastifyReply<HttpResponse>,
        payload: any,
        done: (err?: Error, value?: any) => void,
      ) => void,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Hook that is called when a response is about to be sent to a client
     */
    addHook(
      name: 'onResponse',
      hook: (res: ServerResponse, next: (err?: Error) => void) => void,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Adds a hook that is triggered when server.close is called.
     * Useful for closing connections
     * and performing cleanup tasks
     */
    addHook(
      name: 'onClose',
      hook: (
        instance: fastify$FastifyInstance<
          HttpServer,
          HttpRequest,
          HttpResponse,
        >,
        done: () => void,
      ) => void,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Adds a hook that is triggered when a new route is registered.
     * Listeners are passeda
     * routeOptions object as the sole parameter. The interface is synchronous,
     * and, as such, the listeners do not get passed a callback.
     */
    addHook(
      name: 'onRoute',
      hook: (
        opts: fastify$RouteOptions<HttpServer, HttpRequest, HttpResponse> & {
          path: string,
          prefix: string,
        },
      ) => void,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Useful for testing http requests without running a sever
     */
    inject(
      opts: fastify$HTTPInjectOptions | string,
      cb: (err: Error, res: fastify$HTTPInjectResponse) => void,
    ): void;

    /**
     * Useful for testing http requests without running a sever
     */
    inject(
      opts: fastify$HTTPInjectOptions | string,
    ): Promise<fastify$HTTPInjectResponse>;

    /**
     * Set the 404 handler
     */
    setNotFoundHandler(
      handler: (
        request: fastify$FastifyRequest<HttpRequest>,
        reply: fastify$FastifyReply<HttpResponse>,
      ) => void,
    ): void;

    /**
     * Set a function that will be called whenever an error happens
     */
    setErrorHandler(
      handler: (
        error: Error,
        request: fastify$FastifyRequest<HttpRequest>,
        reply: fastify$FastifyReply<HttpResponse>,
      ) => void,
    ): void;

    /**
     * Set the schema compiler for all routes.
     */
    setSchemaCompiler(
      schemaCompiler: fastify$SchemaCompiler,
    ): fastify$FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

    /**
     * Create a shared schema
     */
    addSchema(schema: /*ObjectKeyword*/ {}): fastify$FastifyInstance<
      HttpServer,
      HttpRequest,
      HttpResponse,
    >;

    /**
     * Get all shared schemas
     */
    getSchemas(): {
      [shemaId: string]: Object,
    };

    /**
     * Add a content type parser
     */
    addContentTypeParser(
      contentType: string | string[],
      opts: {
        bodyLimit?: number,
      },
      parser: fastify$ContentTypeParser<HttpRequest>,
    ): void;
    addContentTypeParser(
      contentType: string | string[],
      opts: {
        parseAs: 'string',
        bodyLimit?: number,
      },
      parser: fastify$BodyParser<HttpRequest, string>,
    ): void;
    addContentTypeParser(
      contentType: string | string[],
      opts: {
        parseAs: 'buffer',
        bodyLimit?: number,
      },
      parser: fastify$BodyParser<HttpRequest, Buffer>,
    ): void;
    addContentTypeParser(
      contentType: string | string[],
      parser: fastify$ContentTypeParser<HttpRequest>,
    ): void;

    /**
     * Check if a parser for the specified content type exists
     */
    hasContentTypeParser(contentType: string): boolean;

    /**
     * Prints the representation of the internal radix tree used by the router
     */
    printRoutes(): string;
  }

  //   declare function fastify<
  //   HttpServer extends (HttpServer | http2.Http2Server) = HttpServer,
  //   HttpRequest extends (IncomingMessage | http2.Http2ServerRequest)
  // = IncomingMessage,
  //   HttpResponse extends (ServerResponse | http2.Http2ServerResponse)
  // = ServerResponse
  // >(opts?: fastify.ServerOptions): fastify.FastifyInstance<HttpServer,
  // HttpRequest, HttpResponse>

  declare function fastify(
    opts?: fastify$ServerOptionsAsHttp,
  ): fastify$FastifyInstance<HttpServer, IncomingMessage, ServerResponse>
  // declare function fastify(
  //   opts?: fastify$ServerOptionsAsSecureHttp,
  // ): fastify$FastifyInstance<https.Server, IncomingMessage, ServerResponse>
  // declare function fastify(opts?: fastify$ServerOptionsAsHttp2
  // ): fastify$FastifyInstance<http2.Http2Server, http2.Http2ServerRequest,
  // http2.Http2ServerResponse>;
  // declare function fastify(opts?: fastify$ServerOptionsAsSecureHttp2
  // ): fastify$FastifyInstance<http2.Http2SecureServer,
  // http2.Http2ServerRequest, http2.Http2ServerResponse>;

  declare export default typeof fastify
}
