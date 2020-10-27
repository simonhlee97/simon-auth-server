const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
// const morgan = require('morgan')
const app = express()
// const router = require('./router')
const connectDB = require('./config/db')
// App setup
app.use(cors())
app.use(express.json())
// app.use(morgan('combined')) // log requests
dotenv.config()
connectDB()
// router(app)
const todosRouter = require('./routers/todos')
const usersRouter = require('./routers/users')

app.use('/api/todos', todosRouter)
app.use('/api/users', usersRouter)

// serve up static assets if in Production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

// Server setup
const port = process.env.PORT || 3090
app.listen(port, () => {
	console.log('Server listening on:', port)
})
