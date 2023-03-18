const {default :mongoose} = require("mongoose")
const BlogSchema = new mongoose.Schema({
    title: {type:String,required:true},
    content: {type:String,required:true},
})

const BlogModel = mongoose.model("blog" , BlogSchema)
module.exports = {BlogModel}