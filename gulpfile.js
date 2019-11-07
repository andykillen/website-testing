var gulp = require('gulp');

var concat       = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
// var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var gutil = require("gulp-util");
var streamqueue  = require('streamqueue');


function errorHandler (error) {
 // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}


// destination ./ puts into ./js directory.  
// it writes the file 3 times. normal, minified, minified with sourcemap
gulp.task('js', function(){
  
  return gulp.src('src/*.js')
    .pipe(gulp.dest('./js'))
    .pipe(uglify().on('error',errorHandler ))
      .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./js'))  
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({ extname: '.sourcemap.js' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'))
    ;
});

gulp.task('combiner', function(){
  return streamqueue({ objectMode: true },
    gulp.src('./src/elements.js'),
    gulp.src('./src/testing.js'),
    gulp.src('./src/reporting.js'),
    gulp.src('./src/manager.js')
    
)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./'))
    .on('error', errorHandler);
});

gulp.task('default', [ 'js', 'combiner' ]);

gulp.task('watch', function(){
  // gulp.watch('assets/**/*.scss', ['css']);
  gulp.watch('src/*.js', ['js']);
  gulp.watch('js/*.js', ['combiner']);
  
});

