import twilio from 'twilio';
import config from "../config/enviroment.config.js"

const ACCOUNT_SID = config.ACCOUNT_SID;
const AUTH_TOKEN = config.AUTH_TOKEN;
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

export const sendTicketMessage = async ticket => {
	try {
		const userPhone = ticket.purchaser.phone;
		if (!userPhone) return `el usuario no tiene telefono registrado.`;

		const orderCode = ticket.code;
		const orderAmount = ticket.amount;

		await client.messages.create({
			body: `Tu orden a sido procesada. codigo orden: ${orderCode}. Total: $${orderAmount}.`,
			from: '+16184278156',
			to: userPhone,
		});
		return;
	} catch (err) {
		return `${err}`;
	}
};
