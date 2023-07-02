---
title: Server Side Rendering
redirectFrom:
  - /guides/ssr
  - /guides/server-side-rendering
---

Server-side rendering (SSR) means that the content of your site is generated on the server and then sent to the browser - which these days is achieved in very different ways and forms.

## Non-Isomorphic SSR

You don't need to do anything special to support non-isomorphic SSR/SSG workflow.

This way initial html is usually generated separately, by using some sort of template engine, which is quite often run with different (not JS) programming language.
The frontend code in this case starts only at the client and usually starts with typical `document.querySelector('.my-anchor-class-for-js-code')` - and it is not used in any way to generate the server response.

This approach works for `effector`, as well as any javascript code. Any SPA application is basically an edge-case of it, as its html template does not contain any content, except for `<script src="my-app.js" />` link.

:::tip
If you have non-isomorphic SSR - just use `effector` the way you would for an SPA app.
:::

## Isomorphic SSR

When you have an isomorphic SSR application, most of the frontend code is **shared with server** and used to generate the response html.

You can also think of it as a an approach, where your app starts at the server - and then gets transfered over the network to the client browser, where it **continues** the work.

That's where the name comes from - despite the fact, that the code is bundled for and run in different enviroments, its output remains (mostly) the same, if given the same input.

There are a lot of different frameworks, which are built upon this approach - e.g. `Next.js`, `Remix.run`, `Razzle.js`, `Nuxt.js`, `Astro`, etc

:::tip
`Next.js` does SSR/SSG in the special way, which requires a bit of custom handling on the `effector` side.

This is done via dedicated [`@effector/next`](https://github.com/effector/next) package - use it, if you want to use `effector` with `Next.js`.
:::

For this guide we will not focus on any specific framework or server implementation - these details will be abstracted away.


