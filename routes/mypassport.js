var express = require('express');
var router = express.Router();
var User = require ('../models/user');
var swig = require('swig');
var prettyjson = require('prettyjson');

/* GET mypassport page. */
router.get('/', function(req, res, next) {
  res.render('mypassport');
});

/* GET editpassport page. */
router.get('/edit', function(req, res, next) {
  swig.setFilter('dateFormat', function (input) {
    var date = new Date(input);
    console.log('input:', input);
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 1)).slice(-2);
  });
  res.render('editpassport');
});

/* POST editpassport page */
router.post('/edit', function(req, res) {
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
