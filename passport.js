var mongoose = require('mongoose');
var User = mongoose.model('User');

// Local Strategy
var LocalStrategy = require('passport-local').Strategy;

// Twitter Strategy
var TwitterStrategy = require('passport-twitter').Strategy;

// Facebook Strategy
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./config');

module.exports = function(passport) {

	// Serialize user
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserialize user object
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

// Local Strategy

passport.use(new LocalStrategy({
  passReqToCallback : true
}, function(req, username, password, done) {
		console.log('Using LocalStrategy');
    User.findOne({ username: username }, function (err, user) {
			console.log('user:', user);
      if (err) { throw(err); }
      if (!user) {
        // Create new user object if it does NOT exit
				console.log('Create user b/c it wanst found');
  			var newUser = new User({
  				provider_id: 0,
  				provider: 'local',
					password: password,
  				username: username,
          name: req.body.first_name + " " + req.body.last_name
          // email: req.body.email
  			});
				console.log('Made the user — Now to save it');
  			//and store it in DB
  			newUser.save(function(err) {
  				if(err) throw err;
					console.log('Saving the user');
  			});
				return done(null, newUser);
				console.log('Should have saved the user');
      }
      if (!user.validPassword(password)) {
				console.log('Invalid Password');
        return done(null, false, { message: 'Incorrect password.' });
      }
			console.log('Successfully authenticated');
      return done(null, user);
    });
  }
));

	// Twitter Config
	passport.use(new TwitterStrategy({
		consumerKey		 : config.twitter.key,
		consumerSecret	: config.twitter.secret,
		callbackURL		 : 'http://beta-express.travelingchildrenproject.com/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			// Get user if it already exists
			if(!err && user!= null) return done(null, user);

			// Create new user object if it does NOT exit
			var newUser = new User({
				provider_id	: profile.id,
				provider		 : profile.provider,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			//and store it in DB
			newUser.save(function(err) {
				if(err) throw err;
				done(null, newUser);
			});
		});
	}));

  // Facebook Config
	passport.use(new FacebookStrategy({
		clientID			: config.facebook.key,
		clientSecret	: config.facebook.secret,
		callbackURL	 : 'http://beta-express.travelingchildrenproject.com/auth/facebook/callback',
		profileFields : ['id', 'last_name', 'gender', 'birthday', 'email', 'photos']
	}, function(accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);

			var newUser = new User({
				provider_id	: profile.id,
				provider		 : profile.provider,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			newUser.save(function(err) {
				if(err) throw err;
				done(null, newUser);
			});
		});
	}));

};
