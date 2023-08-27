const gRPC = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('user.proto')
const grpcObject = gRPC.loadPackageDefinition(packageDef)
const userPackage = grpcObject.userPackage

const client = new userPackage.User("localhost:4000")

gRPC.credentials.createInsecure()

client.createUser({"name": "Al Farabi"}, (err, data) => {
    console.log(err || data)
})