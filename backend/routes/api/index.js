const router = require('express').Router()

router.use('/message', require('./message'))
router.use('/user', require('./user'))

module.exports = router
