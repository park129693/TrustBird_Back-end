const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')

const apiRouter = require('./router/apiRouter')

const app = express()

require('dotenv').config()
require('./router/passport/config').config(passport)

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret : "To Fill",
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true,
        secure : false
    }
}))
app.use(cors())
app.use(express.static('pubilc'))

//Connection Mongo DB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err)
    else console.log('DB Connected')
})

//Passport
app.use(passport.initialize())
app.use(passport.session())

//Add Routing File List on Middleware
app.use('/', apiRouter)

//Start Server
PORT=process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is Starting http://localhost:${PORT}`)
})