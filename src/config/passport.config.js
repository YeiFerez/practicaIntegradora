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
				const { first_name, last_name, email, age } = req.body;
				try {
					if (email == 'adminDan@gmail.com') {
						return done(null, false, {
							status: 200,
							message: 'cuenta admin no es posible continuar',
						});
					}
					const user = await userModel.findOne({ email: username });

					if (user) {
						return done(null, false, {message: 'ya existe este usuario'});
					};

					const newUser = {
						first_name,
						last_name,
						email,
						age,
						password: createHash(password),
						role: 'user',
					};

					const result = await userModel.create(newUser);
					return done(null, result, {message: 'Usuario Creado'});
				} catch (err) {
					return done('Error:', err);
				};
			}
		)
	);

  passport.use(
		'login',
		new LocalStrategy(
			{ passReqToCallback: true, usernameField: 'email' },
			async (req, username, password, done) => {
				try {
					if (username == 'adminDan@gmail.com' && password == 'Danilo1234') {
						const user = await adminModel.findOne({ email: username });
						if (!user) {
							const user = await adminModel.create({
								email: 'adminDan@gmail.com',
								password: createHash(password),
								role: 'admin',
							});
							return done(null, user);
						}
						return done(null, user);
					}


					const user = await userModel.findOne({ email: username });
					if (!user) {
						return done(null, false, {message: 'usuario no existe'});
					};

          if(!isValidPassword(user, password)){
						return done(null, false, {message: 'credenciales invalidas'});
          };

					return done(null, user);
				} catch (err) {
					return done('Error:', err);
				};
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
					const user = await userModel.findOne({ email: profile._json.email });
					if (!user) {
						const newUser = {
							first_name: profile._json.name.split(' ')[0],
							last_name: profile._json.name.split(' ')[2],
							email: profile._json.email,
							age:'',
							password: '',
						};

						const result = await userModel.create(newUser);
						return done(null, result);
					} else {
						done(null, user);
					};
				} catch (err) {
					return done('Error:', err);
				};
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
