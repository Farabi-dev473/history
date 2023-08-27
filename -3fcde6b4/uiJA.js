const gRPC = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('user.proto')
const grpcObject = gRPC.loadPackageDefinition(packageDef)
const userPackage = grpcObject.userPackage

const server = new gRPC.Server()
server.bind(4000, gRPC.ServerCredentials.createInsecure())

const createUser = (call, callback) => {
  console.log(call)
}

server.addService(userPackage,User.service, {
  "createUser": createUser   
})

server.start()