import { successResponse, errorResponse, HTTP_STATUS  } from '../utils/recursos.js';
import { sessionsService } from '../services/services.js';

export const login = async (req, res) => {
	try {
		const payload = await sessionsService.getLogin(req, res);
		if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).send(payload);
		return res.status(HTTP_STATUS.OK).json(successResponse({ user: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const register = async (req, res) => {
	try {
		const payload = await sessionsService.getRegister(req, res);
		if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).send(payload);
		return res.status(HTTP_STATUS.OK).json(successResponse({ user: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const current = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/');
		const payload = await sessionsService.getCurrent(req, res);
		if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).send(payload);
		return res.status(HTTP_STATUS.OK).json(successResponse({ user: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const github = async (req, res) => {
	try {
		const payload = await sessionsService.getGithub(req, res);
		if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		return res.redirect('/');
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const githubCallback = async (req, res) => {
	try {
		const payload = await sessionsService.getGithubCallback(req, res);
		if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		return res.redirect('/');
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const logout = async (req, res) => {
	try {
		const payload = await sessionsService.getLogout(req, res);
		if (typeof(payload) == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		return res.redirect('/');
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export default {
	login,
	register,
	current,
	logout,
	github,
	githubCallback,
  };