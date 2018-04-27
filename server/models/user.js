var _mongoose = require('mongoose')
var _validator = require('validator');





var User = _mongoose.model('User', {
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
    tokens: [
        {
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


module.exports = {User}