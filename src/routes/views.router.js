import { Router } from "express";
import ProductsManager from "../dao/dbManagers/products.js";
import CartManager from "../dao/dbManagers/carts.js";
import ChatManager from "../dao/dbManagers/chats.js";

import productModel from "../dao/models/products.model.js";
import cartModel from "../dao/models/carts.model.js";

const productsManager = new ProductsManager();
const cartManager = new CartManager();
const chatManager = new ChatManager();

const router = Router();

router.get("/register", (req, res) => {
  try {
		if(req.session.user){
			return res.status(200).render("home", {
				user: req.session.user,
				style: "styles.css",
				title: "Home",
			});
		};

		return res.status(200).render("register", {
			style: "styles.css",
			title: "Register",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

router.get("/login", (req, res) => {
  try {
		if(req.session.user){
			return res.status(200).render("home", {
				user: req.session.user,
				style: "styles.css",
				title: "Home",
			});
		};

		return res.status(200).render("login", {
			style: "styles.css",
			title: "Login",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

router.get("/", async (req, res) => {
  try {
		if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				title: "Login",
			});
		};

		return res.status(200).render("home", {
			user: req.session.user,
			style: "styles.css",
			title: "Home",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

router.get("/products", async (req, res) => {
  try {

    if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				title: "Login",
			});
		};

    let { limit, page, query, sort } = req.query;

    // Validación de Page:
    if (page == undefined || page == "" || page < 1 || isNaN(page)) {
      page = 1;
    };

    // Validación de Limit:
    if (limit == undefined || limit == "" || limit <= 1 || isNaN(limit)) {
      limit = 10;
    };

    // Validación de Sort:
    if (sort == undefined || (sort !== 'asc' && sort !== 'desc') || !isNaN(sort)) {
      sort = "asc";
    };

    const filter = { category: query };
    const options = {
      page,
      limit,
      customLabels: {
        totalPages: 'totalPages',
        hasPrevPage: 'hasPrevPage',
        hasNextPage: 'hasNextPage',
        prevPage: 'prevPage',
        nextPage: 'nextPage',
        docs: 'data',
      },
      lean: true
    };

    const products = await productModel.paginate({}, options);
		const filteredProducts = await productModel.paginate(filter, options);

    // Ordenar data según sort:
    if (sort === "asc") {
      // Ascendente
      filteredProducts.data.sort((a, b) => a.price - b.price);
      products.data.sort((a, b) => a.price - b.price);
    } else {
      // Descendente
      filteredProducts.data.sort((a, b) => b.price - a.price);
      products.data.sort((a, b) => b.price - a.price);
    }

    if (products.data.length <= 0) {
			return res.status(200).send(`There's no products for this search`);
		};

    if (filteredProducts.data.length > 0) {
			return res.status(200).render("products", {
				status: "success",
				payload: filteredProducts.data,
				page,
				limit,
				query,
				sort,
				cart,
				totalPages: filteredProducts.totalPages,
				hasPrevPage: filteredProducts.hasPrevPage,
				hasNextPage: filteredProducts.hasNextPage,
				prevPage: filteredProducts.prevPage,
				nextPage: filteredProducts.nextPage,
				title: "Products",
				style: "styles.css",
			});
		}

    return res.status(200).render("products", {
      status: "success",
      title: "Products",
      payload: products.data,
      page,
      limit,
      query,
      sort,
      totalProducts: products.totalDocs,
      totalPages: products.totalPages,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      style: "styles.css",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				title: "Login",
			});
		};
    const { pid } = req.params;
    const product = await productsManager.getProductById(pid);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    return res.status(200).render("product", {
      title: "Product",
      product,
      cart: [], // Aquí puedes obtener los productos del carrito usando cartManager.getAllCarts() y seleccionar el carrito deseado según la sesión del usuario
      style: "styles.css",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/carts", async (req, res) => {
  try {
    let carts = await cartManager.getAllCarts();
    console.log(carts);
    res.render("carts", { title: "Carts", carts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/chat", async (req, res) => {
  // Ruta para mostrar los mensajes del chat
  try {
    if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				title: "Login",
			});
		};
    let messages = await chatManager.getAllMessages();
    console.log(messages);
    res.render("chat", { title: "Chat", messages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
