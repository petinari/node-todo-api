var _mongoose = require('mongoose')


var User = _mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    }
})


module.exports = {User}