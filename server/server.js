const express = require('express')
const app = express()

const xss = require('xss-clean')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const routes = require('./routes')

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