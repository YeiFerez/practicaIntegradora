import { successResponse, errorResponse, HTTP_STATUS  } from '../utils/recursos.js';
import { sessionsRepository } from '../repositories/repository.js';
export const login = async (req, res) => {
	try {
		const payload = await sessionsRepository.getLogin(req, res);
		if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).send(payload);
		res.cookie('userId', payload._id, { signed: true });
		return res.status(HTTP_STATUS.OK).json(successResponse({ user: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const register = async (req, res) => {
	try {
		const payload = await sessionsRepository.getRegister(req, res);
		if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).send(payload);
		res.cookie('userId', payload._id, { signed: true });
		return res.status(HTTP_STATUS.OK).json(successResponse({ user: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const current = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/');
		const payload = await sessionsRepository.getCurrent(req, res);
		if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).send(payload);
		return res.status(HTTP_STATUS.OK).json(successResponse({ user: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const github = async (req, res) => {
	try {
		const payload = await sessionsRepository.getGithub(req, res);
		if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		return res.redirect('/');
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const githubCallback = async (req, res) => {
	try {
		const payload = await sessionsRepository.getGithubCallback(req, res);
		if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		res.cookie('userId', payload._id, { signed: true });
		return res.redirect('/');
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const logout = async (req, res) => {
	try {
		
		const payload = await sessionsRepository.getLogout(req, res);
		if (typeof payload == 'string') return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		res.clearCookie('userId', { signed: true });
		return res.redirect('/');
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const restore = async (req, res) => {
	try {
		const payload = await sessionsRepository.getRestore(req, res);
		if (typeof payload == 'string')
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		return res.redirect('/');
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const restoreCallback = async (req, res) => {
	try {
		const payload = await sessionsRepository.getRestoreCallback(req, res);
		if (typeof payload == 'string')
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
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
	restore,
	restoreCallback,
  };