import { successResponse, errorResponse, HTTP_STATUS  } from '../utils/recursos.js';
import { viewsRepository } from '../repositories/repository.js';


export const home = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/login');
        const payload = await viewsRepository.getHome(req, res);
        if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('home', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const login = async (req, res) => {
    try {
        const { user } = req.session;
        if (user) return res.redirect('/');
        const payload = await viewsRepository.getLogin();
        if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('login', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const register = async (req, res) => {
    try {
        const { user } = req.session;
        if (user) return res.redirect('/');
        const payload = await viewsRepository.getRegister();
        if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('register', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const chat = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/login');
        const payload = await viewsRepository.getChat(req, res);
        if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('chat', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const products = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/');
        const payload = await viewsRepository.getProducts(req, res);
        if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('products', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const product = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/');
        const payload = await viewsRepository.getProduct(req, res);
        if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('product', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const cart = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/');
        const payload = await viewsRepository.getCart(req, res);
        if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
        return res.status(HTTP_STATUS.OK).render('cart', payload);
    } catch (err) {
        return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
    }
};

export const restore = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/');
		const payload = await viewsRepository.getRestore(req, res);
		if (typeof payload == 'string')
			return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('restore', payload);
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const upload = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/');
		const payload = await viewsRepository.getUpload(req, res);
		if (typeof payload == 'string')
			return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('upload', payload);
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const adminUserView = async (req, res) => {
    try {
        const { user } = req.session;
		if (!user) return res.redirect('/');
        const payload = await viewsRepository.getAdminViews(req, res);
        if (typeof payload === 'string') {
             return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
      }
      // Convierte el documento de Mongoose en un objeto plano
      const userToView = payload.userToView.toObject();

      // Agrega el objeto convertido al payload
      payload.userToView = userToView;

      return res.status(HTTP_STATUS.OK).render('adminUser', payload);
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
	cart,
    restore,
    upload,
    adminUserView
  };