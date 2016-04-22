// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'tcp',
//   password : process.env.TCP_DATABASE_PASSWORD,
//   database : 'Passport'
// });
//
// connection.connect();
//
// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });
//
// // var getJourneys = function (callback) {
//   var queryString = 'SELECT * FROM journeys';
//   connection.query(queryString, function(err, rows, fields) {
//     if (err) throw err;
//     console.log("Finished the query");
//     callback();
//     connection.end();
//     return rows;
//   });
//   // console.log('Finished .getJourneys()');
// // }
// //
// // module.exports = {
// //   getJourneys: getJourneys
// // };
