require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL
const SALT_ROUND = Number(process.env.SALT_ROUND)
module.exports = {
    PORT,
    MONGO_URL,
    SALT_ROUND,
}
