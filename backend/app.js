const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const config = require('./config/config')

// express configuration
const app = express()

// cors configuration
const corsOption = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}

app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))

// mongoose configuration
mongoose.connect(config.MONGO_URL)

app.use(require('./routes'))

const isProduction = process.env.NODE_ENV === 'production'
if (!isProduction) {
    app.use(errorHandler())
}

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use((err, req, res) => {
        console.log(err)
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500)
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    })
})

module.exports = app
