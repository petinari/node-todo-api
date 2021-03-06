var _mongoose = require('mongoose')
var _validator = require('validator');
var jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')


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
    console.log(user  + 'user.js')
    user.tokens = user.tokens.concat([{access, token}])




    return user.save().then(() => {
        return token
    })
}

UserSchema.pre('save', function (next) {
    var user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    }else {
        next();
    }
})


UserSchema.statics.findByToken = function (token) {
    var User = this
    var decoded

    try {
        decoded = jwt.verify(token, 'teste')
    } catch (e) {
        return Promise.reject()
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

var User = _mongoose.model('User', UserSchema)


module.exports = {User}