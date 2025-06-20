const express = require ("express")
const app = express ()
require('dotenv').config()
const productRouter = require('./routes/productRouter')
const cartsRouter = require('./routes/cartsRouter')
var logger = require ("morgan")
const viewsRouter = require('./routes/viewsRouter')
const mongoose = require("mongoose")
const session = require('express-session')
const Cart = require('./models/cart.model')


const handlebars = require ("express-handlebars")
const path = require ("path")

app.use(session({
    secret: 'tu_secreto_seguro',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}))

app.use(async (req, res, next) => {
    if (!req.session.cartId) {
    // importá o requerí el modelo Cart arriba en este archivo
        const newCart = await Cart.create({ products: [] })
        req.session.cartId = newCart._id.toString()
    }
    next()
})

app.use(express.json()) 
app.use(express.urlencoded({ extended: true}))
app.use(logger("dev"))
app.use('/api/carts', cartsRouter)
app.use('/api/products', productRouter)
app.use('/', viewsRouter)

app.use(express.static(path.join(__dirname, "public")))


app.use((req,res) => {
    return res.status (404).send(
        `<div>
            <h1>404 Not found</h1>
            <p>La ruta solicitada no existe</p>
        </div>`
    )
})

app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
}))


app.set("view engine", "hbs"),
app.set("views", path.join(__dirname, "views"))

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=> console.error(err))

module.exports = app

