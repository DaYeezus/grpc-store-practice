const ProductModel = require("./product.model");
const {isValidObjectId} = require("mongoose");
const {compressionAlgorithms} = require("@grpc/grpc-js");

async function deleteProduct(call, callBack) {
    try {
        const {id} = call.request
        if(!id || !isValidObjectId(id)) {
            callBack(new Error("Invalid id"), null)
        }
        await ProductModel.deleteOne({_id:id})
        callBack(null, {status:200,message :"product removed successfully"})
    } catch (err) {
        callBack(err, null)
    }
}

async function updateProduct(call, callBack) {
    try {
        const {id,title,price} = call.request
        if(!id || !isValidObjectId(id)) {
            callBack(new Error("Invalid id"), null)
        }

        await ProductModel.updateOne({_id:id} , {$set:{title,price}})
        callBack(null , {status:200,message :"product updated successfully"})
    } catch (err) {
        callBack(err, null)
    }
}

async function createProduct(call, callBack) {
    try {
        const {title,price} = call.request
         await ProductModel.create({title,price})
        callBack(null , {status:201,message :"product created successfully"})
    } catch (err) {
        callBack(err, null)
    }
}

async function getProduct(call, callBack) {
    try {
        const {id} = call.request
        if(!id || !isValidObjectId(id)) {
            callBack(new Error("Invalid id"), null)
        }
        const product = await ProductModel.findOne({_id:id})
        if(!product) callBack(new Error("Product not found") , null)
        callBack(null, product)
    } catch (err) {
        callBack(err, null)
    }
}

async function listProduct(call, callBack) {
    try {
        const products = await ProductModel.find({})
        console.log(products)
        callBack(null , {products})
    } catch (err) {
        callBack(err, null)
    }
}

module.exports = {
    deleteProduct,
    updateProduct,
    createProduct,
    getProduct,
    listProduct,
}