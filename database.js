var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tcp',
  password : process.env.TCP_DATABASE_PASSWORD,
  database : 'Passport'
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

// database.method()

// connection.connect();

var queryString = 'SELECT * FROM journeys';

connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;

    for (var j in rows) {
        console.log('Post Title:', rows[j].title);
    }
});

// connection.end();
