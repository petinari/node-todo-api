var _express = require('express')
var _bodyParser = require('body-parser')
var _ObjectID = require('mongodb').ObjectID
const _ = require('lodash')

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
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    if (!_ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
           return res.status(400).send()
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send()
    })
})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id
    if (!_ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(400).send()
        }
        res.send({ todo })
    }).catch((e) => {
        res.status(400).send()
    })
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['text', 'completed'])

    if (!_ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false
        body.completedAt = null

    }
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(400).send()
        }
        res.send({ todo })
    }).catch((e) => {
        res.status(400).send()
    })
    
})

app.listen(3000, () => {
    console.log('Started on port 3000')
})

