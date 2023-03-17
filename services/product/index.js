const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const path = require("path");
const protoPath = path.join(__dirname, "protos", "product.proto");

const productProto = protoLoader.loadSync(protoPath)
const {productPackage} = grpc.loadPackageDefinition(productProto)
const {deleteProduct, updateProduct, createProduct, getProduct, listProduct} = require("./product.grpc")

function main() {
    const server = new grpc.Server()
    server.addService(productPackage.ProductService.service, {
        deleteProduct,
        updateProduct,
        createProduct,
        getProduct,
        listProduct
    })
    server.bindAsync("localhost:5000", grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.log(err.message)
        console.log("gRPC ProductService Runing over port " + port);
        server.start()
    })
}

main()