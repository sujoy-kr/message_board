const router = require('express').Router()
const messageController = require('../../controllers/messageController')
const objectIdVerification = require('../../middlewares/objectIdVerification')
const auth = require('../auth')

// for passport jwt strategy
// const passport = require('passport')
// require('../../config/passport')

router.get('/', messageController.getAllMessages)
router.post('/', auth.required, messageController.createMessage)
router.get('/:id', objectIdVerification, messageController.getMessageById)

module.exports = router
