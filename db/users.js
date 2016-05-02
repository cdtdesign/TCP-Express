var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tcp',
  password : process.env.TCP_DATABASE_PASSWORD,
  database : 'Passport'
});

var records;
connection.query('SELECT * FROM travelers', function (err, returned_records, fields) {
  if (err) throw err;
  records = returned_records;
  return records;
});

exports.findOrCreate = function (profile, cb) {
  console.log('findOrCreate was called from users.js at line 17');
  console.log('Profile data:', profile);
  var userObj = new this();
  this.db.model('User').findOne({facebookId : profile.id},
    function(err,result){
    if(!result){
      userObj.username = profile.displayName;
      // ...
      userObj.save(cb);
      connection.query('INSERT INTO travelers (email, password, first_name, last_name, traveler_name, traveler_gender, parent_gender) VALUES ("' + req.body.email + '", "' + req.body.password + '", "' + req.body.first_name + '", "' + req.body.last_name + '", "' + req.body.traveler_name + '", 3, 3)', function (err, results, fields) {
        if (err) throw err;
        console.log(results);
      });
    }else{
      cb(err,result);
    }
  });
}

exports.findById = function(id, cb) {
  console.log('Look for the user by id');
  process.nextTick(function() {
    if (records[id]) {
      cb(null, records[id]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(email, cb) {
  console.log('find by username');
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      console.log(record);
      if (record.email === email) {
        console.log('Should have logged in');
        return cb(null, record);
      } else {
        console.log('not logged in.');
      }
    }
    return cb(null, null);
  });
}
