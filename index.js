const dotenv = require("dotenv");
dotenv.config();

const express = require('express')
const app = express()
const port = process.env.PORT // localhost:port

const mongoose = require('mongoose')// mogoose: nodejs와 mongoDB 연결하는 ODM
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

