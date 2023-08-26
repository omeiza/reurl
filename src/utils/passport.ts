// Passport: Google Strategy
import googlePassport from "passport-google-oauth20";
import passport from "passport";
import AuthServices from "../models/authService.model";
import User from "../models/user.model";
import { generateKey } from "./helper.util";

const GoogleStrategy = googlePassport.Strategy;
passport.use("google",
	new GoogleStrategy({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (token: string, tokenSecret: string, profile, done) => {
			AuthServices.getUserByProvider('google', profile.id)
				.then(async (result) => {
					const authProvider = result.get({ plain: true });

					// Update the user with a new api key
					const newAPIKey = generateKey();
					await Users.update({apiKey: newAPIKey}, {
						where: {
							id: authProvider.userId
						},
					});

					const user = await Users.findByPk(authProvider.userId);
					done(null, user.apiKey);
				});

			const apikey = generateKey();
			const signupData = {
				email: profile._json.email,
				apiKey: apikey,
				username: `${profile._json.given_name.toLowerCase()}${profile._json.family_name.toLowerCase()}`,
				isVerified: true
			};

			User.build(signupData).save()
				.then(async (newUser) => {
					await AuthServices.create({
						userId: newUser.id,
						providerName: 'google',
						providerIdentifier: profile.id
					});

					const userObject = newUser.get({plain: true});
					done(null, userObject.apiKey);
				});

			done(null, false);
		}
	)
);