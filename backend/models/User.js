const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
            },
        ],
    },
    {
        timestamps: true,
    }
)

// removes version when returning
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject.password
    },
})

module.exports = mongoose.model('User', userSchema)
