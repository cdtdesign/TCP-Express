var express = require('express');
var router = express.Router();
var User = require ('../models/user');
var swig = require('swig');

/* GET mypassport page. */
router.get('/', function(req, res, next) {
  res.render('mypassport');
});

/* GET editpassport page. */
router.get('/edit', function(req, res, next) {
  swig.setFilter('dateFormat', function (input) {
    var date = new Date(input);
    return ("0" + date.getFullYear()).slice(-4) + '-' + ("0" + date.getMonth()).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
  });
  res.render('editpassport');
});

router.get('/delete', function(req, res, next) {
  User.remove({_id: req.user._id}, function (err) {
    if (err) throw err;
    res.redirect('/auth/signout');
  });
});

module.exports = router;
