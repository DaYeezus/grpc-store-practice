const mongoose = require( "mongoose")
const ProductSchema = new mongoose.Schema({
    title : {type:String , require:true},
    price : {type:Number , require:true},
})


const ProductModel = mongoose.model("product", ProductSchema)
module.exports = ProductModel
