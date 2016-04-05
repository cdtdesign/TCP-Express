var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

/* GET terms page. */
router.get('/termsofservice', function(req, res, next) {
  res.render('terms');
});

/* GET sponsorship page. */
router.get('/sponsorship', function(req, res, next) {
  res.render('sponsorship');
});

module.exports = router;
