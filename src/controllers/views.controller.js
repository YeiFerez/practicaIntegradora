import { successResponse, errorResponse, HTTP_STATUS  } from '../utils/recursos.js';
import { viewsService } from '../services/services.js';


export const home = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/login');
        const payload = await viewsService.getHome(req, res);
        if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('home', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const login = async (req, res) => {
    try {
        const { user } = req.session;
        if (user) return res.redirect('/');
        const payload = await viewsService.getLogin();
        if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('login', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const register = async (req, res) => {
    try {
        const { user } = req.session;
        if (user) return res.redirect('/');
        const payload = await viewsService.getRegister();
        if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('register', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const chat = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/login');
        const payload = await viewsService.getChat(req, res);
        if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('chat', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const products = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/');
        const payload = await viewsService.getProducts(req, res);
        if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('products', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const product = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/');
        const payload = await viewsService.getProduct(req, res);
        if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('product', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const cart = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/');
        const payload = await viewsService.getCart(req, res);
        if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('cart', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export default {
	home,
	login,
	register,
	chat,
	products,
	product,
	cart
  };