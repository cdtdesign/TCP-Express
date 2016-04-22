var express = require('express');
var router = express.Router();
// var database = require('../database');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tcp',
  password : process.env.TCP_DATABASE_PASSWORD,
  database : 'Passport'
});

// connection.connect();

/* GET blog page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });

  var queryString = 'SELECT * FROM journeys JOIN travelers ON travelers.id = journeys.traveler';
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    console.log("Finished the query");

    res.render('blog', {
      "journeys": rows
    });
  });
  // connection.end();
});

module.exports = router;
