var express = require('express');
var router = express.Router();

/* GET blog page. */
router.get('/journey-blog', function(req, res, next) {
  res.render('blog', { title: 'Express' });
});

module.exports = router;
