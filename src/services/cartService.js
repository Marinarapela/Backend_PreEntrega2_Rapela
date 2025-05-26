const CartManager = require('../managers/cartManager')
const cartManager = new CartManager()

exports.createCart = () => cartManager.createCart()

exports.getCartById = (cid) => cartManager.getCartById(Number(cid))

exports.addProductToCart = (cid, pid) => cartManager.addProductToCart(Number(cid), Number(pid))
