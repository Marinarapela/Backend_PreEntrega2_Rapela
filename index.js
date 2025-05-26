const app = require("./src/app.js")

const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server)

const ProductManager = require('./src/managers/productManager')
const productManager = new ProductManager('./src/db/products.json')

io.on('connection', async socket => {
    console.log('Cliente conectado')

    socket.emit('products', await productManager.getAllProducts())

    socket.on('addProduct', async data => {
        await productManager.addProduct(data)
        io.emit('products', await productManager.getAllProducts())
    })

    socket.on('deleteProduct', async id => {
        await productManager.deleteProduct(id)
        io.emit('products', await productManager.getAllProducts())
    })
})

const PORT = 8080

app.listen (PORT, () => {
    console.log (`Server listening on port http://localhost:${PORT}`)
})