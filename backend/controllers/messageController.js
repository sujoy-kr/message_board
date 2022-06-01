const Message = require('../models/Message')
const mongoose = require('mongoose')

const getAllMessages = async (req, res) => {
    const messages = await Message.find({}).sort('-createdAt').populate('user')
    res.json(messages)
}

const getMessageById = async (req, res, next) => {
    const id = req.params.id
    const message = await Message.findById(id)
    if (message) {
        return res.json(message)
    }
    next()
}

const createMessage = async (req, res, next) => {
    const { title, content, user } = req.body
    const message = new Message({
        title,
        content,
        user,
    })
    try {
        await message.save()
        res.json(message)
    } catch {
        next()
    }
}

const deleteMessage = async (req, res, next) => {
    const id = req.params.id
    // check mongo objectId verification and pass to errorHandler if fails
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('The `id` is not valid')
        err.status = 400
        return next(err)
    }
    await Message.findByIdAndRemove(id)
    res.json({
        message: 'Message deleted',
    })
}

module.exports = {
    getAllMessages,
    createMessage,
    getMessageById,
    deleteMessage,
}
