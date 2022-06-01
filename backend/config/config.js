require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL
const SALT_ROUND = Number(process.env.SALT_ROUND)
const JWT_SECRET = process.env.JWT_SECRET
const NODE_ENV = process.env.NODE_ENV || 'production'
module.exports = {
    PORT,
    MONGO_URL,
    SALT_ROUND,
    JWT_SECRET,
    NODE_ENV,
}
