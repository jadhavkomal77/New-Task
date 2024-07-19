const blogcontroller = require("../controllers/BlogController")

const router = require("express").Router()



router
    .get("/get", blogcontroller.getAllBlogs)
    .post("/add", blogcontroller.addBlogs)
    .put("/update/:id", blogcontroller.updateBlogs)
    .delete("/remove/:id", blogcontroller.deleteBlogs)
    .put("/publish/:blogId", blogcontroller.publishBlog)
    .delete("/delteuser/:blogId", blogcontroller.detleuserBlogs)

module.exports = router