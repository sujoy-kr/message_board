const router = require('express').Router()
const messageController = require('../../controllers/messageController')
const objectIdVerification = require('../../middlewares/objectIdVerification')

router.get('/', messageController.getAllMessages)
router.post('/', messageController.createMessage)
router.get('/:id', objectIdVerification, messageController.getMessageById)

module.exports = router
