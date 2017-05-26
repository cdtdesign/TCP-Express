var express = require('express');
var router = express.Router();
var User = require ('../models/user');
var swig = require('swig');
var prettyjson = require('prettyjson');
var multer = require('multer');
var appRootPath = require('app-root-path');
var mime = require('mime-types');
var uuid = require('node-uuid');

var parentImageFilename;
var travelerImageFilenames = {};

/* Multer to change profile images */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var saveDirectory;

    if (file.fieldname.indexOf('travelers') != -1) {
      // It's a traveler image
      saveDirectory = '/public/images/traveler-images/';
    } else {
      // Assume it's a profile image
      saveDirectory = '/public/images/profile-images/';
    }
    cb(null, appRootPath + saveDirectory);
  },
  filename: function (req, file, cb) {
    var profilePhotoFilename = uuid.v1() + '.' + mime.extension(file.mimetype);

    if (file.fieldname.indexOf('travelers') != -1) {
      // It's a travelers' photo; Remember the
      // filename for this traveler for
      // later insertion to the database
      travelerImageFilenames[file.fieldname] = profilePhotoFilename;
    } else {
      // It's a parent, so we'll save
      // their filename for later
      parentImageFilename = profilePhotoFilename;
    }
    cb(null, profilePhotoFilename);
  }
});

var upload = multer({storage: storage});

/* GET mypassport page. */
router.get('/', function(req, res, next) {
  swig.setFilter('friendlyDate', function (input) {
    var date = new Date(input);
    return ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + '-' + date.getFullYear();
  });
  res.render('mypassport');
});

/* GET editpassport page. */
router.get('/edit', function(req, res, next) {
  if (req.user) {
    swig.setFilter('dateFormat', function (input) {
      var date = new Date(input);
      return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 1)).slice(-2);
    });
    res.render('editpassport');
  } else {
    res.redirect('/');
  }
});

/* POST editpassport page */
router.post('/edit', upload.any(), function(req, res) {
  User.find({_id: req.user._id}, function (err, user) {
    if (err) throw err;
    var user = user[0];

    // Extract the data from the form
    // and save it in the database
    user.first_name = req.body.first_name;
    user.parent_gender = req.body.parent_gender;
    user.email = req.body.email;
    user.address_tel = req.body.address_tel;
    user.parent_birthday = req.body.parent_birthday;
    user.address_street = req.body.address_street;
    user.address_city = req.body.address_city;
    user.address_state = req.body.address_state;
    user.address_zip = req.body.address_zip;

    if (parentImageFilename) {
      user.photo = parentImageFilename;
      user.has_local_photo = true;
    }

    // Travelers info
    user.travelers = [];

    for (var i = 0; i < req.body.travelers.length; i++) {
      var traveler = req.body.travelers[i];

      if (traveler != undefined && traveler.name != "" && traveler.birthday != "") {
        console.log('travelerImageFilenames:', travelerImageFilenames);

        user.travelers[i] = {
          "name": traveler.name,
          "birthday": traveler.birthday,
          "gender": traveler.gender,
          "photo": travelerImageFilenames['travelers[' + i + '][profile_img_upload]']
        };
      }
    }

    // Save it all to the database
    user.save(function () {
      User.find({_id: req.user._id}, function (err, user) {
        if (err) throw err;
        var user = user[0];

        // Reload the user data in the session
        req.login(user, function (err) {
          if (err) throw err;
          res.locals.user = user;
          res.redirect('/mypassport/edit');
        });
      });
    });
  });
});

router.get('/delete', function(req, res, next) {
  User.remove({_id: req.user._id}, function (err) {
    if (err) throw err;
    res.redirect('/auth/signout');
  });
});

module.exports = router;
