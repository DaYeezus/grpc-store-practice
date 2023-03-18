const {isValidObjectId} = require("mongoose");
const {BlogModel} = require("./blog.model");

async function listBlogs(call,callBack){
    try {
        const blogs = await BlogModel.find({})
        callBack(null , {blogs})
    } catch (err) {
        callBack(err, null)
    }
}
async function getBlog(call,callBack){
    try {
        const {id} = call.request
        if(!id || !isValidObjectId(id)) {
            callBack(new Error("Invalid id"), null)
        }
        const blog = await BlogModel.findOne({_id:id})
        if(!blog) callBack(new Error("Blog not found") , null)
        callBack(null, blog)
    } catch (err) {
        callBack(err, null)
    }
}
async function createBlog(call,callBack){
    try {
        const {title,content} = call.request
        await BlogModel.create({title,content})
        callBack(null , {status:201,message :"blog created successfully"})
    } catch (err) {
        callBack(err, null)
    }
}
async function updateBlog(call,callBack){
    try {
        const {id,title,content} = call.request
        if(!id || !isValidObjectId(id)) {
            callBack(new Error("Invalid id"), null)
        }

        await BlogModel.updateOne({_id:id} , {$set:{title,content}})
        callBack(null , {status:200,message :"blog updated successfully"})
    } catch (err) {
        callBack(err, null)
    }
}
async function removeBlog(call,callBack){
    try {
        const {id} = call.request
        if(!id || !isValidObjectId(id)) {
            callBack(new Error("Invalid id"), null)
        }
        await BlogModel.deleteOne({_id:id})
        callBack(null, {status:200,message :"blog removed successfully"})
    } catch (err) {
        callBack(err, null)
    }
}

module.exports = {
    listBlogs,
    getBlog,
    createBlog,
    updateBlog,
    removeBlog,
}