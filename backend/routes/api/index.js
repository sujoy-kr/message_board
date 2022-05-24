const router = require('express').Router()

router.use('/message', require('./message'))

module.exports = router
