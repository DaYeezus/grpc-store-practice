const express = require("express")
const {productRouter} = require("./product.router");
const router = express.Router()
router.use("/products" , productRouter);
module.exports = {
    mainRouter:router
}