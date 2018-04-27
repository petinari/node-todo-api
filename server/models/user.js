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
            validator: (value) => {

            },
            message : '{value} is not a valid email'
        }
    }
})


module.exports = {User}