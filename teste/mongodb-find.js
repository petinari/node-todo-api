const _MongoClient = require('mongodb').MongoClient

_MongoClient.connect('mongodb://127.0.0.1:27017/TodoApiDB', (err, client) => {
    if (err) {
        return console.log(err)
    }
    console.log('Connected to MongoDB')

    const db = client.db('TodoApiDB')

    //db.collection('todos').insertOne({
    //    text: 'Something to do',
    //    complete: false
    //}, (err, res) => {
    //    if (err) {
    //       return console.log(err)
    //    }
    //    console.log(JSON.stringify(res.ops, undefined, 2))
    //})

    //db.collection('Users').insertOne({
    //    name: 'Robson Petinari',
    //    age: 31,
    //    location: 'Campo Grande'
    //}, (err, res) => {
    //    if (err) {
    //        return console.log(err)
    //    }
    //    console.log(JSON.stringify(res.ops, undefined, 2))
    //})

    db.collection('todos').find({complete: false}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log(err)
    })

    client.close()
})
