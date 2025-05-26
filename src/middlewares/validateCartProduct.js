const { param, validationResult } = require('express-validator')

const validateCartProduct = [
    param('cid')
        .isInt({ gt: 0 })
        .withMessage('El ID del carrito (cid) debe ser un número entero positivo'),
    param('pid')
        .isInt({ gt: 0 })
        .withMessage('El ID del producto (pid) debe ser un número entero positivo'),

  // Middleware final que maneja los errores
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

module.exports = validateCartProduct
