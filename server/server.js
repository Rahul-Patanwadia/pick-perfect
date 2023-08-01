const express = require('express')
const app = express()

require('dotenv').config();
const xss = require('xss-clean')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const routes = require('./routes')

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//body parse
app.use(express.json())

//sanitize
app.use(xss())
app.use(mongoSanitize())

app.use('/api', routes)

const port = process.env.port || 3001
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})