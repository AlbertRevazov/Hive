require('dotenv').config()
const express = require('express')
// const routers = require('./routes')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', routers)

app.listen(process.env.PORT, () => {
	console.log('server start ', process.env.PORT)
})
