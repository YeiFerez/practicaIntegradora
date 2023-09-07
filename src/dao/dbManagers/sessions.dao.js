import passportCall from "../../utils/passport.utils.js";

export class SessionsManagerDAO {
	constructor() {}

	async getLogin(req, res) {
		try {
			return await passportCall(req, res, 'login')
		} catch (error) {
			return `${error}`;
		}
	}

	async getRegister(req, res) {
		try {
			return await passportCall(req, res, 'register')
		} catch (error) {
			return `${error}`;
		}
	}

	async getGithub(req, res) {
		try {
			return await passportCall(req, res, 'github')
		} catch (error) {
			return `${error}`;
		}
	}

	async getGithubCallback(req, res) {
		try {
			return await passportCall(req, res, 'github')
		} catch (error) {
			return `${error}`;
		}
	}

	async getLogout(req, res) {
		try {
			return req.session.destroy();
		} catch (error) {
			return `${error}`;
		}
	}
}