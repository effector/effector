//@flow

import {render} from './render'
//$todo
const Express = require('express')
const app = Express()
const port = 3000

app.use('/static', Express.static(`${__dirname}/`))

app.use((req, res) => {
 res.send(render())
})

app.listen(port)
