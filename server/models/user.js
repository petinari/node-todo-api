var _mongoose = require('mongoose')
var _validator = require('validator');
var jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserSchema = new _mongoose.Schema(
{
    email: {
        type: String,
            required: true,
            trim: true,
            minLength: 1,
            unique: true,
            validate: {
            validator: _validator.isEmail,
                message : '{value} is not a valid email'
        }
    },
    password: {
        type: String,
            required: true,
            minLength: 6
    },
    tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]

})


UserSchema.methods.generateAuthToken = function () {
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'teste').toString()

    user.tokens = user.tokens.concat([{access, token}])




    return user.save().then(() => {
        return token
    })
}

var User = _mongoose.model('User', UserSchema)


module.exports = {User}