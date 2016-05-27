var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index');
});

/* GET download page. */
router.get('/download', function(req, res, next) {
  res.render('download');
});

/* GET Journey Kit */
router.get('/download/JourneyKit', function(req, res, next) {
  res.download(__dirname + '/../public/pdfs/TCP_PIY_JourneyKit.pdf');
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search');
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

/* GET travelshop page. */
router.get('/shop', function(req, res, next) {
  res.render('travelshop');
});

/* GET explore page. */
router.get('/explore', function(req, res, next) {
  res.render('explore');
});

module.exports = router;
