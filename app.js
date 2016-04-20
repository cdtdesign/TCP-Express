var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var child_process = require("child_process");

var routes = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var blog = require('./routes/blog');
var footer = require('./routes/footer');
var database = require('./database');

var app = express();

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
app.use('/signup', signup);
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


// Express-Authentication

// var express = require('express'),
// 	authentication = require('express-authentication'),
// 	app = express();
//
// var auth = authentication();
//
// // Authentication is just middleware! The middleware must just obey a few rules;
// // no need to include another library.
// var api = auth.for('api').use(function(req, res, next) {
//
// 	// provide the data that was used to authenticate the request; if this is
// 	// not set then no attempt to authenticate is registered.
// 	req.challenge = req.get('Authorization');
//
// 	req.authenticated = req.authentication === 'secret';
//
// 	// provide the result of the authentication; generally some kind of user
// 	// object on success and some kind of error as to why authentication failed
// 	// otherwise.
// 	if (req.authenticated) {
// 		req.authentication = { user: 'bob' };
// 	} else {
// 		req.authentication = { error: 'INVALID_API_KEY' };
// 	}
//
// 	// That's it! You're done!
// 	next();
// });
//
// var session = auth.for('session').use(function(req, res, next) {
// 	// ...
// });
//
// var facebook = auth.for('facebook').use(function(req, res, next) {
// 	// ...
// });
//
// // Allow session/api authentication to occur anywhere; that is to say someone
// // can provide credentials for either kind of authentication and they will be
// // accepted.
// app.use(session);
// app.use(api);
//
//
//
// // Only allow facebook authentication to occur at the /facebook location.
// app.use('/facebook', facebook);
//
// // Ensure this route is only authenticated via session
// app.get('/session', session.required());
//
// // Allow anything to authenticate against this route
// app.get('/any', auth.required());
//
// // Invoke specific middleware when authentication either succeeds or fails
// // which is much more powerful than passports `redirect` ability.
// app.get('/handlers', api.succeeded(), redirect('/'));
// app.get('/handlers', session.succeeded(), redirect('/'));
// app.get('/handlers', auth.failed(), redirect('/signin'));
//
// // Get authentication data from middleware itself
// app.get('/any', function(req, res) {
//
// 	// Get anything that was set
// 	var result = api.of(req);
//
// 	if (result.authenticated) {
// 		// Use auth.data
// 	}
// });
