var express = require('express');
var router = express.Router();

/* GET mypassport page. */
router.get('/', function(req, res, next) {
  console.log('req.user:', req.user);
  res.render('mypassport');
});

module.exports = router;
