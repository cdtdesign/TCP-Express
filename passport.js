var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('./config');
var bcrypt = require('bcrypt');

// Strategies
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {
	// Serialize user
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	// Deserialize user object
	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	// Local Strategy
	passport.use(new LocalStrategy({
	  passReqToCallback : true
	}, function (req, username, password, done) {
		// Look for a user in the database
	  User.findOne({username: username}, function (err, user) {
	    if (err) throw err;

			// If there aren't any matching users and they're trying to
			// create an account either at '/auth/signup' or via the API
			// create a new passport profile for them
	    if (!user && req.route.path == '/signup' || req.isAPI) {
				// Match all the data from the submitted form to the 'user' schema
				var newUser = new User({
					provider_id: 0,
					provider: 'local',
					username: username,
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					traveler_name: req.body.traveler_name,
					email: req.body.username
				});

				// Salt and hash the password
				bcrypt.genSalt(10, function (err, salt) {
					if (err) return next(err);

					bcrypt.hash(password, salt, function (err, hashedPassword) {
						newUser.password = hashedPassword;

						// Save the new user object to the database
						newUser.save(function (err) {
							if (err) throw err;
						});
					});
				});

				// All done
				return done(null, newUser);
	    }

			// If there was a user in the database check the password. If it
			// matches we'll return the traveler object from the database and
			// if it's incorrect we'll tell the client it's the wrong password
			//
			// !user.validPassword(password) ??? Note: Not sure what this is.
			if (user) {
				bcrypt.compare(password, user.password, function (err, passwordMatches) {
					if (err) return done(err);

					console.log('passwordMatches:', passwordMatches);

					if (passwordMatches) {
						return done(null, user);
					} else {
						return done(null, false, {
							message: 'Incorrect password.'
						});
					}
				});
			} else {
				// If the user isn't trying to create an account and they're not
				// already in the database tell them they don't have an account
				return done(null, false, {
					message: 'You don\'t have an account.'
				});
			}
	  });
	}));

	// Twitter Config
	passport.use(new TwitterStrategy({
		consumerKey: config.twitter.key,
		consumerSecret: config.twitter.secret,
		callbackURL: 'https://beta-express.travelingchildrenproject.com/auth/twitter/callback'
	}, function (accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function (err, user) {
			if(err) throw(err);
			// Get user if it already exists
			if(!err && user!= null) return done(null, user);

			// Create new user object if it does NOT exit
			var newUser = new User({
				provider_id: profile.id,
				provider: profile.provider,
				name: profile.displayName,
				photo: profile.photos[0].value
			});
			//and store it in DB
			newUser.save(function (err) {
				if(err) throw err;
				done(null, newUser);
			});
		});
	}));

	// Facebook Config
	passport.use(new FacebookStrategy({
		clientID: config.facebook.key,
		clientSecret: config.facebook.secret,
		callbackURL: 'https://beta-express.travelingchildrenproject.com/auth/facebook/callback',
		profileFields: [
			'id',
			'first_name',
			'last_name',
			'gender',
			'birthday',
			'email',
			'picture'
		]
	}, function (accessToken, refreshToken, profile, done) {
		User.findOne({
			provider_id: profile.id
		}, function (err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);

			var newUser = new User({
				provider_id: profile.id,
				provider: profile.provider,
				name: profile.displayName
			});

			// Optional properties
			if (profile.picture && profile.picture.length > 0) {
				newUser.photo = profile.picture[0].value;
			}

			newUser.save(function (err) {
				if(err) throw err;
				done(null, newUser);
			});
		});
	}));
};
