const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('../config/config')

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

// hashes password before saving
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }
        const hashedPassword = await bcrypt.hash(
            this.password,
            config.SALT_ROUND
        )
        this.password = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
})

// checks if users enter a correct password when logging in
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (err) {
        throw new Error(err)
    }
}

// removes version when returning
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject.password
    },
})

module.exports = mongoose.model('User', userSchema)
