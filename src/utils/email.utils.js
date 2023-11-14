import { createTransport } from 'nodemailer';
import config from '../config/enviroment.config.js'

const EMAIL = config.EMAIL;
const EMAIL_PASSWORD = config.EMAIL_PASSWORD;
const PORT = config.PORT;

const transporter = createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: EMAIL,
		pass: EMAIL_PASSWORD,
	},
});

export const sendTicketEmail = async ticket => {
	try {
		const userEmail = ticket.purchaser.email;
		const orderCode = ticket.code;
		const orderAmount = ticket.amount;

		const emailContent = {
			from: EMAIL,
			to: `${userEmail}`,
			subject: 'Gracias por tu orden',
			html: `
			<div>
				<p>Tu orden fue procesada</p>
				<p>Order code: ${orderCode}</p>
				<p>Total: $${orderAmount}</p>
			</div>
			`,
		};

		await transporter.sendMail(emailContent);
		return;
	} catch (error) {
		return `${error}`;
	}
};

export const sendRestoreEmail = async (restoreEmail) => {
	try {
		const emailContent = {
			from: EMAIL,
			to: `${restoreEmail}`,
			subject: 'Crea una nueva contraseña',
			html: `
			<div>
				<p>Para crear una nueva contraseña ingresa en este link:</p>
				<a href="http://localhost:${PORT}/restore">Crea una nueva contraseña</a>
				<p>Este link expira en 1 hora</p>
			</div>
			`,
		};

		await transporter.sendMail(emailContent);
		return;
	} catch (error) {
		return `${error}`;
	}
};

export const sendAccountDeletionEmail = async (email) => {
	try {
	  const emailContent = {
		from: EMAIL,
		to: email,
		subject: 'Cuenta eliminada por inactividad',
		html: `
		<div>
		  <p>Tu cuenta ha sido eliminada debido a inactividad.</p>
		  <p>Si deseas seguir utilizando nuestros servicios, por favor inicia sesión nuevamente.</p>
		</div>
		`,
	  };
  
	  await transporter.sendMail(emailContent);
	  return;
	} catch (error) {
	  return `${error}`;
	}
  };

  export const sendProductDeletionEmail = async (userEmail, productName) => {
	try {
	  const emailContent = {
		from: EMAIL,
		to: `${userEmail}`,
		subject: 'Producto eliminado',
		html: `
		  <div>
			<p>El producto "${productName}" ha sido eliminado.</p>
		  </div>
		`,
	  };
  
	  await transporter.sendMail(emailContent);
	  return;
	} catch (error) {
	  return `${error}`;
	}
  };
  


