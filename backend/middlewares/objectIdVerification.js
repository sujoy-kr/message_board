const mongoose = require('mongoose')
// check mongo objectId verification and pass to errorHandler if fails
const objectIdVerification = (req, res, next) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('The `id` is not valid')
        err.status = 400
        return next(err)
    }
    next()
}

module.exports = objectIdVerification
