import { CartManagerDAO } from "./carts.dao.js";
import { ProductsManagerDAO } from "./products.dao.js";
import { SessionsManagerDAO } from "./sessions.dao.js";
import { ViewsManagerDAO } from "./views.dao.js";
import { UsersManagerDAO } from "./users.dao.js";

const cartsDAO = new CartManagerDAO();
const productsDAO = new ProductsManagerDAO();
const sessionsDAO = new SessionsManagerDAO();
const viewsDao = new ViewsManagerDAO();
const usersDAO = new UsersManagerDAO();

export const getDAOS = () => {
  return {
    cartsDAO,
    productsDAO,
    sessionsDAO,
    viewsDao,
    usersDAO
  }
}