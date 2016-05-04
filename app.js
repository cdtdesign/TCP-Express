// Goal is to make sure Mongo is connecting to Passport
//
// Then figure out whether to keep data
// in MySQL or somehow get it into Mongo
//
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var cons = require('consolidate');
var child_process = require("child_process");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var OAuth2Strategy = require('passport-oauth2').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

var express = require('express');
var app = express();
var router = express.Router();


// Bootstrap Middleware
app.use(require('morgan')('combined'));
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(cookieParser('secret'));
app.use(bodyParser());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true , cookie: { maxAge: 60000 }}));
// app.use(session({ secret: 'anything' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var mongoose = require('mongoose');
var mongoose_db = mongoose.connection;
mongoose.connect('mongodb://localhost/passport');

var userSchema = mongoose.Schema({
  _id: Number,
  oauth2Id: String,
  facebookId: Number,
  email: String,
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema);

var db = require('./db');

// var database = require('../database');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tcp',
  password : process.env.TCP_DATABASE_PASSWORD,
  database : 'Passport'
});

var MongoClient = require('mongodb').MongoClient;

console.log('Connecting to MongoDB');
// Connection URL
var url = 'mongodb://localhost:27017/passport';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected correctly to server");

  passport.use(new Strategy(
    function(username, password, cb) {
      db.collection('Users').findByUsername(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }));

  // Oauth2 Authentication Strategy
  passport.use(new OAuth2Strategy({
      authorizationURL: 'http://beta-express.travelingchildrenproject.com/oauth2/authorize',
      tokenURL: 'http://beta-express.travelingchildrenproject.com/oauth2/token',
      clientID: process.env.FACEBOOK_KEY,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://beta-express.travelingchildrenproject.com/auth/oauth2/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      db.collection('Users').findOrCreate({ oauth2Id: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));

  // Facebook Authentication Strategy
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_KEY,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://beta-express.travelingchildrenproject.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      db.collection('Users').findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));

  // Twitter Authentication Strategy
  passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://beta-express.travelingchildrenproject.com/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
      db.collection('Users').findOrCreate({ twitterId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.collection('Users').findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
  db.close();
});

mongoose_db.on('error', function (err) {
  if (err) throw err;
});

mongoose_db.once('open', function() {

});

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  function(req, res) {
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/signin'
    });

    // Successful authentication, redirect home.
    res.redirect('/');
  });

// <<<<<<< HEAD
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.


// =======
// >>>>>>> 55d8ed922b1cbed00e06bccdb8ea4d3aab1a1cae
var routes = require('./routes/index');
var auth = require('./routes/auth');
var blog = require('./routes/blog');
var footer = require('./routes/footer');
// var database = require('./database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', cons.swig)
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth', auth);
app.use('/journeyblog', blog);
app.use('/', footer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
