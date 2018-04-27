var _mongoose = require('mongoose');

_mongoose.Promise = global.Promise
_mongoose.connect('mongodb://127.0.0.1:27017/TodoApiDB')

module.exports = { _mongoose }