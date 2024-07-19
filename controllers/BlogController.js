
const asyncHandler = require("express-async-handler");
const Blog = require("../model/Blog");
const mongoose = require("mongoose");

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

exports.getAllBlogs = asyncHandler(async (req, res) => {
    const result = await Blog.find().populate("userId");
    res.json({ message: "blog fetch success", result });
});

exports.addBlogs = asyncHandler(async (req, res) => {
    await Blog.create(req.body);
    res.json({ message: "blog create success" });
});

exports.updateBlogs = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (blog.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Forbidden: You can only edit your own blogs" });
    }
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "blog update success" });
});

exports.deleteBlogs = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Forbidden: You can only delete your own blogs" });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "blog delete success" });
});

// Blog schema


exports.publishBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    await Blog.findByIdAndUpdate(blogId, { ...req.body, publish: true })
    res.status(200).json("Blog Publish Success")
})

exports.detleuserBlogs = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    await Blog.findByIdAndDelete(blogId)
    res.status(200).json({ message: "user Blog delteed" })
})
