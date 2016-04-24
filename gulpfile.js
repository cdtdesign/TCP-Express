var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('serve', function () {
  // Run Mongo
  exec('mongod');

  // Run Nodemon
  exec('nodemon ./bin/www');
});
