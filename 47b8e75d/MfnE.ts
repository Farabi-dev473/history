const proxyServerConfigs = {
        protocol: process.env.PROXY_SERVER_PROTOCOL,
        host: process.env.PROXY_SERVER_HOST,
        port: process.env.PROXY_SERVER_PORT,
        auth: {
          username: process.env.PROXY_SERVER_USERNAME,
          password: process.env.PROXY_SERVER_PASSWORD
        }
}

export default proxyServerConfigs