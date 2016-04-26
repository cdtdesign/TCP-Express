var gulp = require('gulp');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('default', function () {
  // Run Mongo
  exec('mongod');

  // Run Nodemon
  nodemon();

  // Run Browser-Sync
  // browserSync.init([
  //   "views/***",
  //   "public/stylesheets/***"
  // ], {
  //   proxy: 'localhost:9000',
  //   open: true,
  //   browser: "Google Chrome"
  // });
});
