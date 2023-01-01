import React from 'react'
import { renderToPipeableStream, renderToString, renderToStaticNodeStream } from 'react-dom/server'
import App from '../src/App'
import fs from 'fs'
import path from 'path'

const ABORT_DELAY = 5000
module.exports = async function renderToPipe(res) {
	let isError = false

	res.socket.on('error', (error) => {
		console.error('Error: ', error)
	})

	const { pipe, abort } = renderToPipeableStream(<App />, {
		onShellReady() {
			res.statusCode = isError ? 500 : 200
			res.setHeader('Content-type', 'text/html')
			pipe(res)
		},
		onError(error) {
			isError = true
			console.error(error)
		}
	})
	setTimeout(abort, ABORT_DELAY)
}

module.exports = function renderToStaticNode(url, res) {
	const stream = renderToStaticNodeStream(<App />)
	stream.pipe(res)
}

module.exports = function renderAsString(url, res) {
	fs.readFile(path.resolve(path.join(__dirname, '../build/index.html')), 'utf-8', (err, data) => {
		if (err) {
			console.log(err)
			res.status(500).send(err)
		}
		const html = renderToString(<App />)
		return res.send(data.replace('<div id="root"></div>', `<div id="root">${html}</div>`))
	})
}
