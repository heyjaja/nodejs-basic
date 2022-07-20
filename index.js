const express = require('express')
const app = express()
const port = 5000 // server port: localhost:5000

const mongoose = require('mongoose')// mogoose: nodejs와 mongoDB 연결하는 ODM
mongoose.connect('mongodb+srv://jaja:1234@boilerplate.cavw08x.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

