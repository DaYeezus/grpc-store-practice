const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const path = require("path");
const {default:mongoose} = require("mongoose")
const {listBlogs,
    getBlog,
    createBlog,
    updateBlog,
    removeBlog,
} = require("./blog.grpc")
const protoPath = path.join(__dirname, "protos", "blog.proto");
const blogProto = protoLoader.loadSync(protoPath)
const {blogPackage} = grpc.loadPackageDefinition(blogProto)
function main(){
    const server = new grpc.Server()
    server.addService(blogPackage.BlogService.service , {
        listBlogs,
        getBlog,
        createBlog,
        updateBlog,
        removeBlog,
    })
    console.log(process.env.SERVER_ADDRESS)
    server.bindAsync(process.env.SERVER_ADDRESS, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.log(err.message)
        console.log("gRPC BlogService Runing over port " + port);
        server.start()
    })

    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {

        console.log('mongodb connected')
    })
}
main()