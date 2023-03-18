const express = require("express")
const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const path = require("path");
const protoPath = path.join(__dirname  , "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(protoPath)
const {blogPackage} = grpc.loadPackageDefinition(blogProto)
const blogClient = new blogPackage.BlogService(process.env.blogs_url, grpc.credentials.createInsecure());
const router = express.Router()
router.get("/" , (req,res,next) => {
    blogClient.listBlogs(null , (err , data) => {

        if(err) {
            return res.status(500).json({
                error :err
            })
        }
        return res.status(200).json({
            blogs:data.blogs
        })
    })
})
router.get("/:id" , (req,res,next) => {
    const {id} = req.params

    blogClient.getBlog({id} , (err , data) => {

        if(err) {
            return res.status(500).json({
                error :err
            })
        }
        return res.status(200).json({
            blog:data
        })
    })
})
router.post("/" , (req,res,next) => {

    const {title, content} = req.query;
    blogClient.createBlog({title, content} , (err , {status,message}) => {
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
    const {title,content} = req.query;
    const requestData = {id,title,content}
    blogClient.updateBlog(requestData , (err , {status,message}) => {
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
    blogClient.removeBlog({id} , (err , {status,message}) => {
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
    blogRouter:router
}