const express = require('express')
const app = express()

const xss = require('xss-clean')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')

//sanitize
app.use(xss())
app.use(mongoSanitize())

const port = process.env.port || 3001
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})