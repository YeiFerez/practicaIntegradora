import productModel from "../models/products.model.js";
import cartModel from "../models/carts.model.js";
import { multiply, getTotal, mongoCart } from "../../utils/recursos.js";
import ChatManager from "./chats.dao.js";
import userModel from "../models/Users.model.js";

const chatManager = new ChatManager();

export class ViewsManagerDAO {
	constructor() {}

    async getHome(req, res){
        try {
			const cart = await mongoCart(req, res);
			const { user } = req.session;
			console.log(cart);

			const payload = {
				header: true,
				user,
				cart: cart._id,
				style: "home.css",
				title: "Home",
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
    }

    async getLogin() {
		try {
			const payload = {
				header: false,
				style: "login.css",
				title: "Login",
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

    async getRegister() {
		try {
			const payload = {
				header: false,
				style: "styles.css",
			    title: "Register",
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

    async getProducts(req, res){
        try {
			const cart = await mongoCart(req, res);
			const { user } = req.session;
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
        lean: true,
    };

    const products = await productModel.paginate(query, options);

    if (products.data.length < 1) return `no se encontro productos en esta busqueda`;

    if (sort === 'asc') {
        products.data.sort((a, b) => a.price - b.price);
    } else {
        products.data.sort((a, b) => b.price - a.price);
    }

    const payload = {
        status: 'success',
        header: true,
        payload: products.data,
        user,
        page,
        limit,
        query,
        sort,
        cart: cart._id,
        totalPages: products.totalPages,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        title: "Products",
        style: "products.css",
    }
    return payload;
    } catch (error) {
			return `${error}`;
		}

    }


    async getProduct(req, res) {
		try {
			const cart = await mongoCart(req, res);
			const { pid } = req.params;

			const product = await productModel.findById(pid).lean();

			if (!product) return `no hay producto con este ID '${pid}'`;

			const payload = {
				header: true,
				product,
				cart: cart._id,
				style: "product.css",
				title: "Product",
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}


    async getCart(req, res) {
		try {
			const { cid } = req.params;
			const cart = await cartModel.findById(cid).populate('products._id').lean();
			if (!cart) return `no se encontro carrito con ID '${cid}'`;

			const payload = {
				header: true,
				cart: cid,
				style: "carts.css",
				title: "Cart",
				helpers: {
					multiply,
					getTotal
				},
				payload: cart.products,
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

    async getChatDao(req, res) {
		try {
			const { user } = req.session;
			const payload = {
				header: true,
				user,
				style: 'chat.css',
				title: "Chat",
                
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	async getRestoreDao(req, res) {
		try {
			let { restoreCookie } = req.signedCookies;
			if (!restoreCookie) return res.redirect('/');
			const { user } = req.session;
			const payload = {
				user,
				style: 'restore.css',
				title: 'Restore',
			};
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	async getUploadDao(req, res) {
		try {
			const { user } = req.session;
			const payload = {
				user,
				style: "upload.css",
				title: "upload",
                
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	async getAdminViewsDao(req, res) {
		try {
			const { user } = req.session;
            const { uid } = req.params;
			// Busca el usuario en la base de datos
			const userToView = await userModel.findById(uid);
			if (!userToView) {
				return res.status(404).json({ message: "Usuario no encontrado" });
			  }

			const payload = {
				header: true,
				user,
				style: "adminUser.css",
				title: "Chat",
				userToView
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

}