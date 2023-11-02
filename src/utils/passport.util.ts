import passport from "passport";
import User, { UserCreationAttributes, UserInstance } from "../models/user.model";
import AuthServices, { AuthServiceInstance } from "../models/authService.model";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./secrets.util";
import googlePassport from "passport-google-oauth20";
import { generateKey } from "./helper.util";

const GoogleStrategy = googlePassport.Strategy;
passport.use(new GoogleStrategy({
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (token: string, tokenSecret: string, profile: any, done: any) => {
		AuthServices.getUserByProvider('google', profile.id)
			.then(async (result: AuthServiceInstance) => {
				const authProvider = result.get({ plain: true });

				// Update the user with a new api key
				const newAPIKey = generateKey();
				await User.update({apiKey: newAPIKey}, {
					where: {
						id: authProvider.userId
					},
				});

				const user = await User.findByPk(authProvider.userId);
				done(null, user.apiKey);
			});

		const apikey = generateKey();
		const signupData: UserCreationAttributes = {
			email: profile._json.email,
			apiKey: apikey,
			username: `${profile._json.given_name.toLowerCase()}${profile._json.family_name.toLowerCase()}`,
			isVerified: true
		};

		User.build(signupData).save()
			.then(async (newUser: UserInstance) => {
				await AuthServices.create({
					userId: newUser.id,
					providerName: 'google',
					providerIdentifier: profile.id
				});

				const userObject = newUser.get({plain: true});
				done(null, userObject.apiKey);
			});

		done(null, false);
	})
);