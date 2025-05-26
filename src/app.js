const express = require ("express")
const app = express ()
const productRouter = require('./routes/productRouter')
const cartsRouter = require('./routes/cartsRouter')
var logger = require ("morgan")
const viewsRouter = require('./routes/viewsRouter')


const handlebars = require ("express-handlebars")
const path = require ("path")

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

module.exports = app

