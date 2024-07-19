const { getallUsers, registerUser, loginUser, logoutUser } = require("../controllers/authController")
const { protectedRouter } = require("../middlewares/Protected")

const router = require("express").Router()

router

    .get("/users", protectedRouter, getallUsers)
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/logout", logoutUser)

module.exports = router