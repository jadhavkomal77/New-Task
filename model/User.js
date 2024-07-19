const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // uniquie: true
    },
    password: {
        type: String,
        required: true,

    },
    phone: {
        type: Number,
        required: true,

    },
    active: {
        type: String,
        default: true,

    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },


}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)