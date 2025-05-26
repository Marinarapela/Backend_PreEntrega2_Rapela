const cartService = require('../services/cartService')

exports.createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart()
        res.status(201).json(cart)
    } catch (error) {
        res.status(500).send('Error al crear el carrito')
    }
}

exports.getCartById = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartService.getCartById(cid)
    if (cart) {
        res.status(200).json(cart)
    } else {
        res.status(404).send('Carrito no encontrado')
    }
    } catch (error) {
        res.status(500).send('Error al obtener el carrito')
    }
}

exports.addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const updatedCart = await cartService.addProductToCart(cid, pid)
    if (updatedCart) {
        res.status(200).json(updatedCart)
    } else {
        res.status(404).send('Carrito no encontrado')
    }
    } catch (error) {
        res.status(500).send('Error al agregar el producto al carrito')
    }
}
