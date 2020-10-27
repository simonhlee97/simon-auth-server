const router = require('express').Router()
let Todo = require('../models/todo.model')

router.get('/', (req, res) => {
	Todo.find()
		.then((todos) => res.json(todos))
		.catch((err) => res.status(400).json('Error: ' + err))
})
// route is '/api/todos/add'
router.route('/add').post((req, res) => {
	const title = req.body.title
	const content = req.body.content

	const newTodo = new Todo({
		title,
		content,
	})

	newTodo
		.save()
		.then(() => res.json('Todo added!'))
		.catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
	Todo.findById(req.params.id)
		.then((todo) => res.json(todo))
		.catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
	Todo.findByIdAndDelete(req.params.id)
		.then(() => res.json('Todo deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
	Todo.findById(req.params.id)
		.then((todo) => {
			todo.title = req.body.title
			todo.content = req.body.content

			todo.save()
				.then(() => res.json('Todo updated!'))
				.catch((err) => res.status(400).json('Error: ' + err))
		})
		.catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
