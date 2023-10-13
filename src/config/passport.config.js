import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2'
import userModel from '../dao/models/Users.model.js';
import adminModel from '../dao/models/admin.model.js';
import { createHash, isValidPassword } from '../utils.js';
import jwt from 'passport-jwt';
import cookieExtractor from '../utils/cookieExtractor.utils.js';
import config from './enviroment.config.js';

const jwtSecret = config.JWT_SECRET;
const githubClientId = config.GITHUB_CLIENT_ID;
const githubClientSecret = config.GITHUB_CLIENT_SECRET;
const githubCallbackUrl = config.GITHUB_CALLBACK_URL;


const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {

	passport.use(
		'jwt',
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
				secretOrKey: jwtSecret,
			},
			async (jwt_payload, done) => {
				try {
					return done(null, jwt_payload);
				} catch (err) {
					return done('Error:', err);
				}
			}
		)
	);


	passport.use(
		'register',
		new LocalStrategy(
			{ passReqToCallback: true, usernameField: 'email' },
			async (req, username, password, done) => {
				try {
					if (username == 'adminDan@gmail.com') return done(null, false, `cuenta admin no es posible continuar.`)

					const user = await userModel.findOne({ email: username });
					if (user) return done(null, false, `ya existe este usuario.`);

					const { first_name, last_name,age } = req.body;
					const newUser = await userModel.create({
						first_name,
						last_name,
						age,
						email: username,
						password: createHash(password),
						role: 'user',
					});
					req.session.user = newUser;
					return done(null, newUser);
				} catch (err) {
					return done(err);
				}
			}
		)
	);
 

	passport.use(
		'login',
		new LocalStrategy(
			{  passReqToCallback: true, usernameField: 'email' },
			async (req, username, password, done) => {
				try {
					if (username == 'adminDan@gmail.com') {
						const admin = await adminModel.findOne({ email: username });
						if (!admin || !isValidPassword(admin, password)) return done(null, false, `credenciales invalidas.`);
						req.session.user = admin;
						return done(null, admin);
					};

					const user = await userModel.findOne({ email: username });
					if (!user || !isValidPassword(user, password)) return done(null, false, `credenciales invalidas.`);
					req.session.user = user;
					return done(null, user);
				} catch (err) {
					return done(err);
				}
			}
		)
	);
	

	passport.use('github',new GitHubStrategy(
			{
				clientID: githubClientId,
				clientSecret: githubClientSecret,
				callbackURL: githubCallbackUrl,
			},
			async (accesToken, refreshToken, profile, done) => {
				try {
					let user = await userModel.findOne({ email: profile._json.email });
					if (!user) {
						user = await userModel.create({
							first_name: profile._json.name.split(' ')[0],
							last_name: profile._json.name.split(' ')[1],
							email: profile._json.email,
							password: '',
						});
					}
					req.session.user = user;
					return done(null, user);
				} catch (err) {
					return done(err);
				}
			}
		)
	);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    const user = await userModel.findById(_id);
    done(null, user);
  });
};

export default initializePassport;
