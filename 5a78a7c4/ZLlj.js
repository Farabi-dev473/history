const gRPC = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('user.proto')
const grpcObject = gRPC.loadPackageDefinition(packageDef)
const userPackage = grpcObject.userPackage
