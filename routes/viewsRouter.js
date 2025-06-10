const { Router } = require('express')
const ProductManager = require('../managers/productManager')
const productService = require('../services/productService')
const Cart = require ('../services/cartService')
const router = Router()

const productManager = new ProductManager()

router.get('/home', async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
        const result = await productService.getAllProducts({ ...req.query, baseUrl })
        res.render('home', {
            ...result,
        cartId: req.session.cartId
        })
    } catch (error) {
        res.status(500).send('Error al obtener productos')
    } 
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
})

router.get('/products', async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
        const result = await productService.getAllProducts({ ...req.query, baseUrl })
        res.render('products', result)
    } catch (err) {
        res.status(500).send('Error al cargar productos')
    }
})

router.get('/products/:pid', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid)
        if (!product) return res.status(404).send('Producto no encontrado')
        res.render('productDetail', { 
            product,
            cartId: req.session.cartId 
        })
    } catch (error) {
        res.status(500).send('Error al obtener el producto')
}
})

router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product')
        if (!cart) return res.status(404).send('Carrito no encontrado')
        res.render('cart', { products: cart.products })
    } catch (error) {
        res.status(500).send('Error al cargar el carrito')
    }
})

module.exports = router
