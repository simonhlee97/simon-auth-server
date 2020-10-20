const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
	email: {
		type: String,
		require: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
	},
})

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
	const user = this
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10)
	}
	next()
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return callback(err)
		}
		callback(null, isMatch)
	})
}

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

	user.tokens = user.tokens.concat({ token })
	await user.save()

	return token
}

// Encrypt password on save
// userSchema.pre('save', function (next) {
// 	const user = this
// 	bcrypt.genSalt(10, function (err, salt) {
// 		if (err) {
// 			return next(err)
// 		}
// 		bcrypt.hash(user.password, salt, null, function (err, hash) {
// 			if (err) {
// 				return next(err)
// 			}
// 			user.password = hash
// 			next()
// 		})
// 	})
// })

const User = mongoose.model('User', userSchema)
module.exports = User
