var express = require('express');
var router = express.Router();
var User = require ('../models/user');
var swig = require('swig');
var prettyjson = require('prettyjson');
var multer = require('multer');
var appRootPath = require('app-root-path');
var mime = require('mime-types');
var uuid = require('node-uuid');

/* Multer to change profile images */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var splitFilename = file.fieldname.split(':');
    var saveDirectory;
    if (splitFilename.length == 1) {
      // Assume it's a profile image
      saveDirectory = '/public/images/profile-images/';
    } else {
      // It's a traveler image
      saveDirectory = '/public/images/traveler-images/';
    }
    cb(null, appRootPath + saveDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v1() + '.' + mime.extension(file.mimetype));
  }
});

var upload = multer({ storage: storage });

/* GET mypassport page. */
router.get('/', function(req, res, next) {
  swig.setFilter('friendlyDate', function (input) {
    var date = new Date(input);
    return ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 1)).slice(-2) + '-' + date.getFullYear();
  });
  res.render('mypassport');
});

/* GET editpassport page. */
router.get('/edit', function(req, res, next) {
  swig.setFilter('dateFormat', function (input) {
    var date = new Date(input);
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 1)).slice(-2);
  });
  res.render('editpassport');
});

/* POST editpassport page */
router.post('/edit', upload.any(), function(req, res) {
  console.log(prettyjson.render(req.files));
  User.find({_id: req.user._id}, function (err, user) {
    if (err) throw err;
    var user = user[0];

    // Extract the data from the form
    // and save it in the database
    user.first_name = req.body.first_name;
    user.parent_gender = req.body.parent_gender;
    user.email = req.body.email;
    user.address_tel = req.body.address_tel;
    user.parent_birthday = req.body.birthday;
    user.address_street = req.body.address_street;
    user.address_city = req.body.address_city;
    user.address_state = req.body.address_state;
    user.address_zip = req.body.address_zip;
    user.profile_img_upload = req.body.profile_img_upload;

    // Travelers info
    for (var i = 0; i < req.user.travelers.length; i++) {
      var traveler = req.user.travelers[i];
      user.travelers[i].name = req.body["name:" + traveler.passport_id];
      user.travelers[i].gender = req.body["gender:" + traveler.passport_id];
      user.travelers[i].birthday = req.body["birthday:" + traveler.passport_id];
    }

    user.save(function () {
      User.find({_id: req.user._id}, function (err, user) {
        if (err) throw err;
        var user = user[0];

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
