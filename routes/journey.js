var express = require('express');
var router = express.Router();

/* GET journey */
router.post('/create', function(req, res, next) {
  var newJourney = new Journey({
    traveler_id: req.body._id,
    traveler_name: req.body.traveler_name,
    title: req.body.title,
    date: req.body.date,
    body: req.body.body,
    header_image_filename: req.body.header_image,
    tags: req.body.tags
  });
  newJourney.save(function (err) {
    if (err) throw err;
    res.redirect ('/journeyblog');
  });
});

module.exports = router;
