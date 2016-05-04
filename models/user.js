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

// connection.query('INSERT INTO travelers (email, password, first_name, last_name, traveler_name, traveler_gender, parent_gender) VALUES ("' + req.body.email + '", "' + req.body.password + '", "' + req.body.first_name + '", "' + req.body.last_name + '", "' + req.body.traveler_name + '", 3, 3)');
