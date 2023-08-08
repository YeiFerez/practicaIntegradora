import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/models/Users.model.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;
const initializePassport = () => {
	passport.use(
		'register',
		new LocalStrategy(
			{ passReqToCallback: true, usernameField: 'email' },
			async (req, username, password, done) => {
				const { first_name, last_name, email, age } = req.body;
				try {
					const user = await userModel.findOne({ email: username });

					if (user) {
						return done(null, false, {message: 'User already exist'});
					};

					const newUser = {
						first_name,
						last_name,
						email,
						age,
						password: createHash(password),
					};

					const result = await userModel.create(newUser);
					return done(null, result, {message: 'User created'});
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
					const user = await userModel.findOne({ email: username });
					if (!user) {
						return done(null, false, {message: 'User doesnt exist'});
					};

          if(!isValidPassword(user, password)){
						return done(null, false, {message: 'Invalid credentials'});
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
				clientID: "Iv1.cf7b2363ae577ece",
				clientSecret: "8d01909b133badbf2a1d9c7de98d4a00cd378afe",
				callbackURL: 'http://localhost:8080/api/session/githubcallback',
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
