import express from "express";
import __dirname from "./utils.js"
import handlebars from 'express-handlebars'
import mongoose from "mongoose";

import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewRouter from "./routes/views.router.js"


const app = express();
const PORT=8080;

mongoose.set('strictQuery', false)
const connection= mongoose.connect('mongodb+srv://yedafeco17:Danilo1234@ecommerce.9zqkpm7.mongodb.net/?retryWrites=true&w=majority')

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',viewRouter)
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const server = app.listen(PORT, () => {
    console.log(`Server escuchando puerto ${PORT}`);
  });