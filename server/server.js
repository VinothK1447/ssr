import express from 'express'
import path from 'path'

const renderToPipe = require('./render')
// const renderToStaticNode = require('./render')
// const renderAsString = require('./render')

const app = express()
app.use(express.static(path.join(__dirname, '../build')))

app.get('/', async function (req, res) {
	renderToPipe(res)
})

// app.get('/', function (req, res) {
// 	renderToStaticNode(req.url, res)
// })

// app.get('/', function (req, res) {
// 	renderAsString(req.url, res)
// })

app.listen(4747, () => {
	console.log(`Server started at port 4747`)
})
