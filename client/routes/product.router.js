const express = require("express")
const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const path = require("path");
const protoPath = path.join(__dirname  , "..", "protos", "product.proto");
const productProto = protoLoader.loadSync(protoPath)
const {productPackage} = grpc.loadPackageDefinition(productProto)
console.log(process.env.products_url)
const productClient = new productPackage.ProductService(process.env.products_url, grpc.credentials.createInsecure());
const router = express.Router()
router.get("/" , (req,res,next) => {
    productClient.listProduct(null , (err , data) => {

        if(err) {
            return res.status(500).json({
                error :err
            })
        }
        return res.status(200).json({
            products:data.products
        })
    })
})
router.get("/:id" , (req,res,next) => {
    const {id} = req.params

    productClient.getProduct({id} , (err , data) => {

        if(err) {
            return res.status(500).json({
                error :err
            })
        }
        return res.status(200).json({
            product:data
        })
    })
})
router.post("/" , (req,res,next) => {

    const {title, price} = req.query;
    productClient.createProduct({title, price} , (err , {status,message}) => {
        if(err) {
            return res.status(500).json({
                error :err
            })
        }
        return res.status(201).json({
            status,
            message
        })
    })
})

router.put("/:id" , (req,res,next) => {
    const {id} = req.params
    const {title,price} = req.query;
    const requestData = {id,title,price}
    productClient.updateProduct(requestData , (err , {status,message}) => {
        if(err) {
            return res.status(500).json({
                error :err
            })
        }
        return res.status(200).json({
            status,
            message
        })
    })
})
router.delete("/:id" , (req,res,next) => {
    const {id} = req.params
    productClient.deleteProduct({id} , (err , {status,message}) => {
        if(err) {
            return res.status(500).json({
                error :err
            })
        }
        return res.status(200).json({
            status,
            message
        })
    })
})
module.exports = {
    productRouter:router
}