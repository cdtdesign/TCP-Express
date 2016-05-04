// Goal is to make sure Mongo is connecting to Passport
//
// Then figure out whether to keep data
// in MySQL or somehow get it into Mongo
//
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var child_process = require("child_process");
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var router = express.Router();


// var mongoose = require('mongoose');
// var mongoose_db = mongoose.connection;
// mongoose.connect('mongodb://localhost/passport');

// var userSchema = mongoose.Schema({
//   _id: Number,
//   oauth2Id: String,
//   facebookId: Number,
//   email: String,
//   username: String,
//   password: String
// });

// var User = mongoose.model('User', userSchema);

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tcp',
  password : process.env.TCP_DATABASE_PASSWORD,
  database : 'Passport'
});

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
