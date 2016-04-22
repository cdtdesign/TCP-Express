var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET download page. */
router.get('/download', function(req, res, next) {
  res.render('download');
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search');
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
