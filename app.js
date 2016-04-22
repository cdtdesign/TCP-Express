var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var flash = require('req-flash');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var child_process = require("child_process");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var blog = require('./routes/blog');
var footer = require('./routes/footer');
// var database = require('./database');

var app = express();

var express = require('express');
var router = express.Router();
// var database = require('../database');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tcp',
  password : process.env.TCP_DATABASE_PASSWORD,
  database : 'Passport'
});

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
app.use('/users', users);
app.use('/auth', auth);
app.use('/journeyblog', blog);
app.use('/', footer);

app.use(express.static('public'));
// app.use(flash());
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);

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

// Passport Config --- SIGNUP

passport.use(new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    connection.query("select * from travelers where email = '"+email+"'",function(err,rows){
    console.log(rows);
    console.log("above row object");
    if (err)
      return done(err);
    if (rows.length) {
      return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    } else {

      // if there is no user with that email
      // create the user
      var newUserMysql = new Object();

      newUserMysql.email    = email;
      newUserMysql.password = password; // use the generateHash function in our user model

      var insertQuery = "INSERT INTO travelers ( email, password ) values ('" + email +"','"+ password +"')";
      console.log(insertQuery);
        connection.query(insertQuery,function(err,rows){
        newUserMysql.id = rows.insertId;

        return done(null, newUserMysql);
      });
    }
  });
}));


// Passport Config --- SIGNIN

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done) { // callback with email and password from our form

    console.log(email, password);

    connection.query("SELECT * FROM travelers WHERE email = '" + email + "'",function(err,rows){
    if (err)
      return done(err);
    if (!rows.length) {
      return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
    }

    // if the user is found but the password is wrong
    if (!( rows[0].password == password))
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, rows[0]);
    });
  })
);

module.exports = app;
