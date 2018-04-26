var _express = require('express')
var _bodyParser = require('body-parser')


var { _mongoose } = require("./db/mongoose")
var Todo = require("./models/todos").Todo
var User = require("./models/user").User

var app = _express()

app.use(_bodyParser.json())


app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res) => {

})

app.listen(3000, () => {
    console.log('Started on port 3000')
})
