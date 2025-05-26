const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const validateCartProduct = require('../middlewares/validateCartProduct')

router.post('/', cartController.createCart)
router.get('/:cid', cartController.getCartById)
router.post('/:cid/product/:pid', validateCartProduct, cartController.addProductToCart)

module.exports = router

