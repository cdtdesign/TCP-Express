var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});



module.exports = router;
