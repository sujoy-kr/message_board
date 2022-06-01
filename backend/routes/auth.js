const { expressjwt: jwt } = require('express-jwt')
const config = require('../config/config')

const extractToken = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
        return req.query.token
    }
    return null
}

const auth = {
    required: jwt({
        secret: config.JWT_SECRET,
        userProperty: 'payload',
        algorithms: ['HS256'],
        getToken: extractToken,
    }),
    optional: jwt({
        secret: config.JWT_SECRET,
        algorithms: ['HS256'],
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: extractToken,
    }),
}

module.exports = auth
