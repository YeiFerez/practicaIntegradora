import { CartManagerDAO } from "./carts.dao.js";
import { ProductsManagerDAO } from "./products.dao.js";
import { SessionsManagerDAO } from "./sessions.dao.js";
import { ViewsManagerDAO } from "./views.dao.js";

const cartsDAO = new CartManagerDAO();
const productsDAO = new ProductsManagerDAO();
const sessionsDAO = new SessionsManagerDAO();
const viewsDao = new ViewsManagerDAO();

export const getDAOS = () => {
  return {
    cartsDAO,
    productsDAO,
    sessionsDAO,
    viewsDao,
  }
}