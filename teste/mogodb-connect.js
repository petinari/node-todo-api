const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApiDB', (err, client) => {
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

    db.collection('todos').find().count().then((count) => {
        console.log(count)
    }, (err) => {
        console.log(err)
    })

    client.close()  
})
