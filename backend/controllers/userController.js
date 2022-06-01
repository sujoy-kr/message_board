// const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/config')

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}

const registerAnUser = async (req, res) => {
    const { name, username, password } = req.body

    const user = new User({
        name,
        username,
        password,
    })
    try {
        await user.save()
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            const error = new Error('User not found')
            error.statusCode = 401
            return next(error)
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            const error = new Error('Incorrect password')
            error.statusCode = 401
            return next(error)
        }
        const payload = {
            user: {
                id: user.id,
            },
        }
        const token = jwt.sign(payload, config.JWT_SECRET)

        res.status(200).json({ id: user._id, name: user.name, token })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllUsers,
    registerAnUser,
    userLogin,
}
