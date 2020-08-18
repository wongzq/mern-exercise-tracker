const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')
const exercisesRouter = require('./routes/exercises')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// use Express app
app.use(cors())
app.use(express.json())

// connecto to MongoDB
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(()=>console.log("MongoDB connected"))
  .catch(err => console.log(err))

const connection = mongoose.connection
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

// router
app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

// listen to a port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})