//@flow

export const html = (data: string) => `
 <!DOCTYPE html>
 <html>
  <head>
   <title>☄️ Effector SSR</title>
  </head>
  <body>
   <div id="root">${data}</div>
   <script type="text/javascript" src="/static/client.js"></script>
  </body>
 </html>
`
