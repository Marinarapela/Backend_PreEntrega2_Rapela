const { Router } = require('express')
const ProductManager = require('../managers/productManager')
const router = Router()

const productManager = new ProductManager('./src/db/products.json')

router.get('/home', async (req, res) => {
    const products = await productManager.getAllProducts()
    res.render('home', { products })
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
})

module.exports = router
