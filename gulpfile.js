var fs = require('fs');
var browserify = require('browserify');

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var pkg = require('./package.json');

gulp.task('default', ['main', 'testbed']);

gulp.task('main', function() {
  var task = browserify({
    entries : [ './lib/index.js' ],
    standalone : 'planck'
  });
  task = task.transform({
    fromString : true,
    compress : false,
    mangle : false,
    output : {
      beautify : true,
      comments : /^((?!Copyright)[\s\S])*$/i
    }
  }, 'uglifyify');
  task = task.bundle();
  task.on('error', function(err) {
    console.log(gutil.colors.red(err.message));
    this.emit('end');
  });
  task = task.pipe(source('planck.js')).pipe(buffer()); // vinylify
  task = task.pipe(header(fs.readFileSync('lib/license.js'), { pkg : pkg }));
  task = task.pipe(gulp.dest('dist'));
  task = task.pipe(rename('planck.min.js'));
  task = task.pipe(uglify({compress: {dead_code: true, global_defs: {DEBUG: false, ASSERT: false}}}));
  task = task.pipe(header(fs.readFileSync('lib/license.js'), { pkg : pkg }));
  task = task.pipe(gulp.dest('dist'));
  return task;
});

gulp.task('testbed', function() {
  var task = browserify({
    entries : [ './testbed/index.js' ],
    standalone : 'planck'
  });
  task = task.transform({
    fromString : true,
    compress : false,
    mangle : false,
    output : {
      beautify : true,
      comments : /license/i
    },
    preserveComments: 'license',
  }, 'uglifyify');
  task = task.bundle();
  task.on('error', function(err) {
    console.log(gutil.colors.red(err.message));
    this.emit('end');
  });
  task = task.pipe(source('planck-with-testbed.js')).pipe(buffer()); // vinylify
  task = task.pipe(header(fs.readFileSync('node_modules/stage-js/lib/license.js'), { pkg : {} }));
  task = task.pipe(header(fs.readFileSync('lib/license.js'), { pkg : pkg }));
  task = task.pipe(gulp.dest('dist'));

  task = task.pipe(rename('planck-with-testbed.min.js'));
  task = task.pipe(uglify({
    compress: {dead_code: true, global_defs: {DEBUG: false, ASSERT: true}},
    output : {comments : 'all'}
  }));
  task = task.pipe(gulp.dest('dist'));
  return task;
});
