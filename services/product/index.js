const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const path = require("path");
const protoPath = path.join(__dirname, "protos", "product.proto");

const productProto = protoLoader.loadSync(protoPath)
const {productPackage} = grpc.loadPackageDefinition(productProto)
const {deleteProduct, updateProduct, createProduct, getProduct, listProduct} = require("./product.grpc")
const {default:mongoose} = require("mongoose");

function main() {
    const server = new grpc.Server()
    server.addService(productPackage.ProductService.service, {
        deleteProduct,
        updateProduct,
        createProduct,
        getProduct,
        listProduct
    })
    console.log(process.env.SERVER_ADDRESS)
    server.bindAsync(process.env.SERVER_ADDRESS, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.log(err.message)
        console.log("gRPC ProductService Runing over port " + port);
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