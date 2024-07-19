const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { protectedRouter } = require("./middlewares/Protected")

require("dotenv").config({ path: "./.env" })

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/blogs", protectedRouter, require("./routes/blogRoute"))

app.use("*", (req, res) => {
    return res.status(404).json({ message: "Resource Not found" })
})

app.use((err, req, res, next) => {
    return res.status(500).json({ message: err.message || "something Went Wrong" })
})
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("server Conntect")
    app.listen(process.env.PORT, console.log("Server running"))
})




