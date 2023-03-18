const express = require("express")
const {productRouter} = require("./product.router");
const {blogRouter} = require("./blog.router");
const router = express.Router()
router.use("/products" , productRouter);
router.use("/blogs" , blogRouter);
module.exports = {
    mainRouter:router
}