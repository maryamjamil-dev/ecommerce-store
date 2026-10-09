const express = require("express")
const productRoutes = require("./routes/product.routes")
const app = express()

app.use("/api/products" , productRoutes)

module.exports = app