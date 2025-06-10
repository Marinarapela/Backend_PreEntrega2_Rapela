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

exports.deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params
        try {
            const result = await cartService.removeProductFromCart(cid, pid)
            res.status(200).json({ status: 'success', message: 'Producto eliminado del carrito', result })
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error eliminando producto', error: error.message })
        }
}

exports.clearCartProducts = async (req, res) => {
    try {
        const { cid } = req.params
        const result = await cartService.clearCartProducts(cid)
        res.status(200).json({ status: 'success', message: 'Carrito vaciado', result })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

exports.updateCartProducts = async (req, res) => {
    const { cid } = req.params
    const productsArray = req.body.products 
    try {
        const result = await cartService.updateCartProducts(cid, productsArray)
        res.status(200).json({ status: 'success', message: 'Carrito actualizado', result })
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error actualizando carrito', error: error.message })
    }
}

exports.updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        if (quantity == null || quantity < 1) {
            return res.status(400).json({ status: 'error', message: 'Cantidad inválida' })
    }
    const result = await cartService.updateProductQuantity(cid, pid, quantity)
    res.status(200).json({ status: 'success', message: 'Cantidad actualizada', result })
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error actualizando cantidad', error: error.message })
    }
}