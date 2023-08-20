import express from "express";
import __dirname from "./utils.js"
import handlebars from 'express-handlebars'
import mongoose from "mongoose";
import session from "express-session";

// Rutas
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chats.router.js"; 
import viewRouter from "./routes/views.router.js"
import sessionRouter from "./routes/sessions.router.js"


const app = express();
const PORT=8080;


import MongoStore from "connect-mongo";
const mongoUrl = "mongodb+srv://yedafeco17:Danilo1234@ecommerce.9zqkpm7.mongodb.net/?retryWrites=true&w=majority"
const enviroment = async () =>{
  await mongoose.connect(mongoUrl);
};
enviroment();
app.use(session({
  store: MongoStore.create({
      mongoUrl:mongoUrl,
      mongoOptions:{ useNewUrlParser:true, useUnifiedTopology:true},
      ttl:3600
  }),
  secret:"12345abcd",
  resave:false,
  saveUninitialized:false
}));


import passport from "passport";
import initializePassport from "./config/passport.config.js";
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))


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