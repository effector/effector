//@flow
import type {TypeDef} from 'effector/stdlib/typedef'
import fastify from 'fastify'

type SidechainIncoming = {
  seq: TypeDef<*, 'step'>,
  ctx: TypeDef<*, 'ctx'>,
}

const app = fastify()

const responses = []

app.post('/session', async(req, res) => {
  const id = responses.length
  responses.push({
    id,
    uploads: [],
  })
  return {id}
})
app.post('/sidechain/:session', async(req, res) => {
  const session = parseInt(req.params.session, 10)
  console.log(req.body)
  responses[session].uploads.push(req.body)
  return 'ok'
})

app.post('/monitor', async(req, res) => responses)

app.get('/', async(req, res) => {
  console.log('got request')
  const eventAmount = ({id, uploads}) =>
    `  <p><b>session ${id}</b></p>
  <p>size ${uploads.length}</p>`
  const view = `<b>sessions: ${responses.length}</b>`
  res.type('text/html').send(
    `<!DOCTYPE html>
<html>
<head>
  <title>Effector stats</title>
</head>
<body>
  <h1>Effector stats</h1>
  ${view}
  ${responses.map(eventAmount).join(`\n`)}
</body>
</html>`,
  )
})

app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})
