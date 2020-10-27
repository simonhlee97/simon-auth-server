const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
	title: {
		type: String,
		require: true,
	},
	content: {
		type: String,
	},
})
const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
