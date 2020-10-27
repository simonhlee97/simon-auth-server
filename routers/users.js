// import controllers
const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

// module.exports = function (app) {
// 	app.get('/', requireAuth, function (req, res) {
// 		res.send({ hi: 'Testing Passport Auth' })
// 	})

// 	app.post('/signin', requireSignin, Authentication.signin)
// 	app.post('/signup', Authentication.signup)
// }

const router = require('express').Router()
let User = require('../models/user.model')

// router.get('/', requireAuth, (req, res) => {
// 	User.find()
// 		.then((users) => res.json(users))
// 		.then(console.log(users))
// 		.catch((err) => res.status(400).json('Error: ' + err))
// })

router.post('/signup', Authentication.signup)
router.post('/signin', requireSignin, Authentication.signin)

module.exports = router
