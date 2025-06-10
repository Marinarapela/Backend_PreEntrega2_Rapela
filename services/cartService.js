const CartManager = require('../managers/cartManager')
const cartManager = new CartManager()

exports.createCart = () => cartManager.createCart()

exports.getCartById = (cid) => cartManager.getCartById(Number(cid))

exports.addProductToCart = (cid, pid) => cartManager.addProductToCart(Number(cid), Number(pid))


exports.removeProductFromCart = (cid, pid) => {
    return cartManager.removeProductFromCart(Number(cid), Number(pid))
}

exports.clearCartProducts = (cid) => {
    return cartManager.clearCartProducts(cid)
}

exports.updateCartProducts = (cid, productsArray) => {
    return cartManager.updateCartProducts(Number(cid), productsArray)
}

exports.updateProductQuantity = (cid, pid, quantity) => {
    return cartManager.updateProductQuantity(Number(cid), Number(pid), quantity)
}
