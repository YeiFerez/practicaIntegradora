import express from "express";
import __dirname from "./utils.js"
import handlebars from 'express-handlebars'
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

// Rutas
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chats.router.js"; 
import viewRouter from "./routes/views.router.js"
import sessionRouter from "./routes/sessions.router.js"


const app = express();
const PORT=8080;

mongoose.set('strictQuery', false)
const connection= mongoose.connect('mongodb+srv://yedafeco17:Danilo1234@ecommerce.9zqkpm7.mongodb.net/?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
);

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))

app.use(session({
  store: MongoStore.create({
      mongoUrl:'mongodb+srv://yedafeco17:Danilo1234@ecommerce.9zqkpm7.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions:{ useNewUrlParser:true, useUnifiedTopology:true},
      ttl:3600
  }),
  secret:"12345abcd",
  resave:false,
  saveUninitialized:false

}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',viewRouter)
app.use('/api/sessions',sessionRouter)
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/chat", chatRouter);

const server = app.listen(PORT, () => {
    console.log(`Server escuchando puerto ${PORT}`);
  });