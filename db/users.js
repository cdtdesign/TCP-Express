// var database = require('../database');
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
