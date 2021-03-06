const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())
const port = 5000

const usersRouter = require('./routers/users')
app.use('/users', usersRouter)

const url = process.env.ATLAS_URL
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true})
.then(() => {
  console.log("Connected to Database");
}).catch((err) =>  console.log("Not Connected to Database ERROR! ", err))


app.listen(port,()=>{
  console.log(`Running server on port ${port}`)
})