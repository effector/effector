//@flow

const express = require('express')

const app = express()

app.use(express.static(`${__dirname}/browser`))

app.listen(7007, () => console.log('serve on port 7007'))
