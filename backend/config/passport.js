const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../models/User')

// signup strategy for passport local
passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username })
                if (user) {
                    return done(null, false, { message: 'User already exists' })
                }
                const newUser = new User({ username, password })
                await newUser.save()
                return done(null, newUser)
            } catch (err) {
                return done(err)
            }
        }
    )
)

// login strategy for passport local
passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username })
                if (!user) {
                    return done(null, false, { message: 'User not found' })
                }
                const isMatch = await user.comparePassword(password)
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' })
                }
                return done(null, user)
            } catch (err) {
                return done(err)
            }
        }
    )
)

// passport jwt strategy
