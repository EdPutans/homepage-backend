const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())
const port = 5000

const linksRouter = require('./routers/links')
const usersRouter = require('./routers/users')

app.use('/links', linksRouter)
app.use('/users', usersRouter)

const url = process.env.ATLAS_URL
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true})

app.listen(port,()=>{
  console.log(`Running server on port ${port}`)
})