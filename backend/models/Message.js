const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

// removes version when returning
messageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Message', messageSchema)
