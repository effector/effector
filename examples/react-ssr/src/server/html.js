//@flow
import type {PersistData} from '../app/index.h'

export const html = (data: string, state: PersistData) => `
 <!DOCTYPE html>
 <html>
  <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta content="IE=edge" http-equiv="X-UA-Compatible">
   <title>Effector SSR</title>
   <style>${fonts}</style>
   <link rel="icon" type="image/png" href="/static/favicon.png">
  </head>
  <body>
   <script>
    window.__DATA__ = ${JSON.stringify(state)}
   </script>
   <div id="root">${data}</div>
   <script type="text/javascript" src="/static/client.js"></script>
  </body>
 </html>
`

const fonts = `
 @font-face {
  font-family: Averta;
  src: url('static/font/averta-regular.woff2') format('woff2');
  font-weight: normal;
 }
 @font-face {
  font-family: Averta;
  src: url('static/font/averta-bold.woff2') format('woff2');
  font-weight: bold;
 }
`
