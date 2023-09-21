import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();
const environment = process.env.NODE_ENV;

const customLevelOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warn: 2,
		info: 3,
		http: 4,
		debug: 5,
	},
	colors: {
		fatal: 'magenta',
		error: 'red',
		warn: 'yellow',
		info: 'green',
		http: 'blue',
		debug: 'cyan',
	},
};

const createLogger = (level) => {
	return winston.createLogger({
		levels: customLevelOptions.levels,
		transports: [
			new winston.transports.Console({
				level,
				format: winston.format.combine(
					winston.format.colorize({ colors: customLevelOptions.colors }),
					winston.format.simple()
				),
			}),
			new winston.transports.File({
				filename: `./logs/${level}_logs.log`,
				level,
				format: winston.format.simple(),
			}),
		],
	});
};

let logger;

if (environment.trim() == 'production') {
	logger = createLogger('info');
} else if (environment.trim() == 'development') {
	logger = createLogger('debug');
} else {
	logger = createLogger('info');
}

export default logger;
