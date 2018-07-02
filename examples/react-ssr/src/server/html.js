//@flow
import type {PersistData} from '../app/index.h'

export const html = (data: string, state: PersistData) => `
 <!DOCTYPE html>
 <html>
  <head>
   <title>☄️ Effector SSR</title>
  </head>
  <body>
   <div id="root">${data}</div>
   <script>
    window.__DATA__ = ${JSON.stringify(state)}
   </script>
   <script type="text/javascript" src="/static/client.js"></script>
  </body>
 </html>
`
