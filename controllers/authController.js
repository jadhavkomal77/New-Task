const asyncHandler = require("express-async-handler")
const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.registerUser = asyncHandler(async (req, res) => {
    const { email, password, username, phone, role } = req.body
    const result = await User.findOne({ email })

    if (result) {
        return res.status(400).json({ message: "Email Alerady Exist" })
    }
    const x = await bcrypt.hash(req.body.password, 10)
    await User.create({ username, email, phone, password: x, role })

    res.json({ message: "User Regiter Success" })
})
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "invalid Email" })
    }
    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(401).json({ message: "invalid Password" })
    }
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1h" })
    res.cookie("auth", token, { maxAge: 1000 * 60, httpOnly: true })

    res.json({
        message: "User login Success", result: {
            username: result.username,
            userId: result._id,
            email: result.email,
            phone: result.phone,
            role: result.role,
        }
    })
})
exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("auth")
    res.json({ message: "User logout Success" })
})
exports.getallUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({ message: "User fetch Success", result })
})