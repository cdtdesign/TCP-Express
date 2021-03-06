var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var child_process = require("child_process");
var cookieParser = require('cookie-parser');
var app = express();
var router = express.Router();
var session = require('cookie-session');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

var mongoose = require('mongoose');
var passport = require('passport');
var User = require ('./models/user');

var api = require('./routes/API');
var routes = require('./routes/index');
var auth = require('./routes/auth');
var blog = require('./routes/blog');
var journey = require('./routes/journey');
var mypassport = require('./routes/mypassport');
var footer = require('./routes/footer');
var flash = require('connect-flash');

// Import models & passport config
require('./models/user');
require('./passport')(passport);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/passport', function(err, res) {
  if(err) throw err;
  console.log('Successfully connected to Mongo');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', cons.swig)
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Get the current domain
var currentDomain;
if ((app.get('env') === 'development')) {
  currentDomain = 'localhost';
} else {
  currentDomain = '.travelingchildrenproject.com';
}
app.use(session({
  cookie: {
    domain: currentDomain,
  },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', routes);
app.use('/API', api);
app.use('/auth', auth);
app.use('/journeyblog', blog);
app.use('/journey', journey);
app.use('/mypassport', mypassport);
app.use('/', footer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

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
