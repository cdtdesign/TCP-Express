var gulp = require('gulp');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  // Run Mongo
  exec('mongod');

  // Run Nodemon
  nodemon();
});
