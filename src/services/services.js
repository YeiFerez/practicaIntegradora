import { getDAOS } from "../dao/dbManagers/indexDAO.js";

const {cartsDAO, productsDAO, sessionsDAO, viewsDao} = getDAOS();

import ProductsService from "./product.service.js";
export const productsService = new ProductsService(productsDAO);

import CartsService from "./carts.service.js";
export const cartsService = new CartsService(cartsDAO);

import ViewsService from "./views.service.js";
export const viewsService = new ViewsService(viewsDao);

import SessionsService from "./sessions.service.js";
export const sessionsService = new SessionsService(sessionsDAO);