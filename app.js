var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var child_process = require("child_process");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var OAuth2Strategy = require('passport-oauth2').Strategy;

var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passport');

var userSchema = mongoose.Schema({
  facebookId: Number,
  email: String,
  username: String,
  password: String
});

userSchema.methods.findOrCreate = function (profile, cb){
    var userObj = new this();
    this.findOne({_id : profile.id},function(err,result){
        if(!result){
            userObj.username = profile.displayName;
            //....
            userObj.save(cb);
        }else{
            cb(err,result);
        }
    });
};

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

// Oauth2 Authentication Strategy

passport.use(new OAuth2Strategy({
    authorizationURL: 'http://beta-express.travelingchildrenproject.com/oauth2/authorize',
    tokenURL: 'http://beta-express.travelingchildrenproject.com/oauth2/token',
    clientID: process.env.FACEBOOK_KEY,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://beta-express.travelingchildrenproject.com/auth/oauth2/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
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
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.use(require('morgan')('combined'));
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(cookieParser('secret'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true , cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Facebook auth
// app.get('/auth/facebook',
//   passport.authenticate('facebook'));
//
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/signin' }),
//   function(req, res) {
//     // Successful authentication, stredirect home.
//     res.redirect('/');
//   });

// app.all('/', function (req, res) {
//   req.flash('test', 'it works.');
// });

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

// Passport Config --- SIGNIN

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

module.exports = app;
