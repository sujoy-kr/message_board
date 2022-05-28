const User = require('../models/User')
const bcrypt = require('bcrypt')
const config = require('../config/config')

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}

const registerAnUser = async (req, res) => {
    const { name, username, password } = req.body
    const salt = await bcrypt.genSalt(config.SALT_ROUND)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        username,
        password: hash,
    })
    try {
        await user.save()
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports = {
    getAllUsers,
    registerAnUser,
}
