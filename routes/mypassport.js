var express = require('express');
var router = express.Router();

/* GET mypassport page. */
router.get('/', function(req, res, next) {
  res.render('mypassport');
});

module.exports = router;
