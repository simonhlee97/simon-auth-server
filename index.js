const express = require('express')
const http = require('http')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
// const morgan = require('morgan')
const app = express()
const router = require('./router')
const connectDB = require('./config/db')
// App setup
// app.use(morgan('combined')) // log requests
app.use(bodyParser.json({ type: '*/*' })) // parse incoming requests as json
dotenv.config()
connectDB()
router(app)
// Server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)
