import { successResponse, errorResponse, HTTP_STATUS  } from '../utils/recursos.js';
import { usersRepository } from '../repositories/repository.js';

export const premium = async (req, res) => {
	try {
		const payload = await usersRepository.getPremium(req, res);
		if (typeof payload == 'string')
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const user = async (req, res) => {
	try {
		const payload = await usersRepository.getUser(req, res);
		if (typeof payload == 'string')
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(payload));
		
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const upload = async (req, res) => {
	try {
		await usersRepository.uploadDocuments(req, res);
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const uploadfile = async (req, res) => {
	try {
		await usersRepository.uploadfiles(req, res);
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const getAllUser = async (req, res) => {
	try {
		await usersRepository.getAllUsers(req, res);
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const deleteInactiveUsers = async (req, res) => {
	try {
		await usersRepository.deleteInactiveUser(req, res);
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};

export const deleteUser = async (req, res) => {
	try {
		await usersRepository.deleteUsers(req, res);
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse(err.message));
	}
};


export default {
	premium,
    user,
	upload,
	uploadfile,
	getAllUser,
	deleteInactiveUsers,
	deleteUser
  };