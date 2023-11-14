import express from "express";
import __dirname from "./utils.js"
import handlebars from 'express-handlebars'
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import config from "./config/enviroment.config.js";
import compression from "express-compression"
import morgan from "morgan";
import cors from "cors"
import router from "./routes/router.js";
import logger from "./utils/logger.util.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express';
import setupSocket from "./utils/socket.utils.js";

// Rutas
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chats.router.js"; 
import viewRouter from "./routes/views.router.js"
import sessionRouter from "./routes/sessions.router.js"


const cookieSecret = config.COOKIE_SECRET;
const PORT = config.PORT;
const mongoUrl = config.MONGO_URL;
const mongoSessionSecret = config.MONGO_SESSION_SECRET;


const swaggerOptions = {
	definition: {
		openaip: '1.0.0',
		info: {
			title: 'API documentation',
			version: '1.0.0',
			description:
				'Servidor backend',
		},
	},
	apis: [`${__dirname}/docs/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);

const app = express();


import MongoStore from "connect-mongo";
const enviroment = async () =>{
  await mongoose.connect(mongoUrl);
};
enviroment();
app.use(cookieParser(cookieSecret));
app.use(session({
  store: MongoStore.create({
      mongoUrl:mongoUrl,
      mongoOptions:{ useNewUrlParser:true, useUnifiedTopology:true},
      ttl:3600
  }),
  secret:mongoSessionSecret,
  resave:false,
  saveUninitialized:false
}));
app.use(compression({
  brotli: {
    enable: true,
    zlib: {}
  }
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

app.use(morgan('dev'));
app.use(cors());
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));


const server = app.listen(PORT, () => {
    logger.info(`Server escuchando puerto ${PORT}`);
  });

setupSocket(server);
router(app);