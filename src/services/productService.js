const ProductManager = require('../managers/productManager')
const productManager = new ProductManager('./db/products.json')

exports.getAllProducts = () => productManager.getAllProducts()

exports.getProductById = (id) => productManager.getProductById(id)

exports.createProduct = (product) => productManager.addProduct(product)

exports.updateProduct = (id, updatedProduct) => productManager.updateProduct(id, updatedProduct)

exports.deleteProduct = (id) => productManager.deleteProduct(id)
