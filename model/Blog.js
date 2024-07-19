
const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    publish: {
        type: Boolean,
        default: false

    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);