var express = require('express');
var router = express.Router();
var User = require ('../models/user');

/* GET mypassport page. */
router.get('/', function(req, res, next) {
  res.render('mypassport');
});

router.get('/delete', function(req, res, next) {
  User.remove({_id: req.user._id}, function (err) {
    if (err) throw err;
    res.redirect('/auth/signout');
  });
});

module.exports = router;
