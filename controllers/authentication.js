const jwt = require('jwt-simple')
const config = require('../config')
const User = require('../models/user')

function tokenForUser(user) {
	const timestamp = new Date().getTime()
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function (req, res, next) {
	// user has successfully signed in with password
	// Now give him a token
	res.send({ token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
	const email = req.body.email
	const password = req.body.password

	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err)
		}

		if (existingUser) {
			return res.status(422).send('error: Email taken')
		}

		// create and save a User
		const user = new User({
			email: email,
			password: password,
		})
		user.save(function (err) {
			if (err) {
				return next(err)
			}
			res.json({ token: tokenForUser(user) })
		})
	})
}
