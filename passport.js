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
    User.findOne({ username: username }, function (err, user) {
      if (err) { throw(err); }
      if (!user) {
        // Create new user object if it does NOT exit
  			var user = new User({
  				provider_id: 0,
  				provider: 'local',
  				username: username,
          name: req.body.first_name + " " + req.body.last_name,
          email: req.body.email
  			});
  			//and store it in DB
  			user.save(function(err) {
  				if(err) throw err;
  				return done(null, user);
  			});
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

	// Twitter Config
	passport.use(new TwitterStrategy({
		consumerKey		 : config.twitter.key,
		consumerSecret	: config.twitter.secret,
		callbackURL		 : '/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			// Get user if it already exists
			if(!err && user!= null) return done(null, user);

			// Create new user object if it does NOT exit
			var user = new User({
				provider_id	: profile.id,
				provider		 : profile.provider,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			//and store it in DB
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));

  // Facebook Config
	passport.use(new FacebookStrategy({
		clientID			: config.facebook.key,
		clientSecret	: config.facebook.secret,
		callbackURL	 : 'http://beta-express.travelingchildrenproject.com/auth/facebook/callback',
		profileFields : ['id', 'displayName', /*'provider',*/ 'photos']
	}, function(accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);

			var user = new User({
				provider_id	: profile.id,
				provider		 : profile.provider,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));

};
