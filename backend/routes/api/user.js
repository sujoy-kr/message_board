const router = require('express').Router()
const userController = require('../../controllers/userController')

router.get('/', userController.getAllUsers)
router.post('/', userController.registerAnUser)
router.post('/login', userController.userLogin)

module.exports = router
