const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.protectedRouter = asyncHandler(async (req, res, next) => {
    //  check for cookie
    if (!req.cookies.auth) {
        return res.status(401).json({ message: "No Cookies Found" })
    }
    //  check for ctoken
    //  verify token
    jwt.verify(req.cookies.auth, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "InValid JWT TOKEN" })
        }
        req.body.userId = decode.userId
        next()
    })
})