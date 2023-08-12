const express = require('express')
const app = express()

require('dotenv').config();
const xss = require('xss-clean')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const routes = require('./routes')
const passport = require('passport')
const {jwtStrategy} = require('./middleware/passport')

const {handleError, convertToApiError} = require('./middleware/apiError')

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

//passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api', routes)

// handle errors
app.use(convertToApiError);

app.use((err,req,res,next)=>{
    handleError(err,res)
})

const port = process.env.port || 3001
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})