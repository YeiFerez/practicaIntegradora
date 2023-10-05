import { getDAOS } from "../dao/dbManagers/indexDAO.js";

const {cartsDAO, productsDAO, sessionsDAO, viewsDao} = getDAOS();

import ProductsRepository from "./product.repository.js";
export const productsRepository = new ProductsRepository(productsDAO);

import CartsRepository from "./carts.repository.js";
export const cartsRepository = new CartsRepository(cartsDAO);

import ViewsRepository from "./views.repository.js";
export const viewsRepository = new ViewsRepository(viewsDao);

import SessionsRepository from "./sessions.repository.js";
export const sessionsRepository = new SessionsRepository(sessionsDAO);