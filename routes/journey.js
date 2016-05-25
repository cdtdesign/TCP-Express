var express = require('express');
var router = express.Router();
var Journey = require('../models/journey');
var multer = require('multer');
var appRootPath = require('app-root-path');
// var crypto = require('crypto');
// var mime = require('node-mime');
// var upload = multer({ dest: '/Users/Christina/Sites/TCP-Express/public/images/journey-images' });

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/Users/Christina/Sites/TCP-Express/public/images/journey-images')
//   },
//   filename: function (req, file, cb) {
//     crypto.pseudoRandomBytes(16, function (err, raw) {
//       cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
//     });
//   }
// });
// var upload = multer({ storage: storage });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRootPath + '/public/images/journey-images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage: storage });


/* GET journey */
router.post('/create', upload.single('header_image'), function(req, res, next) {
  console.log('req.file:', JSON.stringify(req.file));
  var newJourney = new Journey({
    passport_id: req.user.passport_id,
    traveler_name: req.user.traveler_name,
    title: req.body.title,
    date: req.body.date,
    body: req.body.body,
    header_image_filename: req.file.filename,
    tags: req.body.tags
  });
  newJourney.save(function (err) {
    if (err) throw err;
    res.redirect ('/journeyblog');
  });
});

router.get('/get/:journey_id', function (req, res, next) {
  Journey.find({_id: req.params.journey_id}, function (err, journey) {
    if (err) throw err;
    res.json({
      'journey': journey[0],
      'date': journey[0].date.toString()
    });
  });
});

router.post('/edit', upload.single('header_image'), function (req, res, next) {
  Journey.findOneAndUpdate({_id: req.body.journeyId}, {$set: {
    title: req.body.title,
    date: req.body.date,
    body: req.body.body,
    tags: req.body.tags
  }}, function (err) {
    if (err) throw err;
    console.log('req.file:', req.file);
    if (req.file) {
      console.log('Should have updated the file');
      // We have an image
      Journey.findOneAndUpdate({_id: req.body.journeyId}, {$set: {
        header_image_filename: req.file.filename
      }}, function (err) {
        if (err) throw err;
        console.log('Must have updated the image');
        res.redirect ('/journeyblog');
      });
    } else {
      console.log('Didn\'t try to update the image');
      res.redirect ('/journeyblog');
    }
  });
});

router.get('/delete/:journey_id', function (req, res, next) {
  console.log('req.params:', req.params);
  console.log('req.user.passport_id:', req.user.passport_id);
  Journey.find({_id: req.params.journey_id}, function (err, currentJourney) {
    if (err) throw err;
    if (req.user.passport_id == currentJourney[0].passport_id) {
      Journey.remove({_id: req.params.journey_id}, function (err) {
        if (err) throw err;
        res.status(200).json ({
          message: 'Journey was deleted.'
        });
      });
    }
  });
});

module.exports = router;
