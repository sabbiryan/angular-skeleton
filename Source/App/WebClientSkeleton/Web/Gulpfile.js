/*
 * 
 npm install --save gulp gulp gulp-util gulp-file gulp-plumber gulp-changed gulp-minify-html gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-imagemin gulp-rename gulp-concat gulp-strip-debug gulp-notify gulp-cache gulp-livereload del gulp-inject gulp-angular-filesort gulp-preprocess main-bower-files gulp-stylus bower
 *
 */

/*
 * 
 npm uninstall gulp-util gulp-file gulp-plumber gulp-changed gulp-minify-html gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-imagemin gulp-rename gulp-concat gulp-strip-debug gulp-notify gulp-cache gulp-livereload del gulp-inject gulp-angular-filesort gulp-preprocess main-bower-files gulp-stylus bower gulp
 * 
 */


var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    minifyHTML = require('gulp-minify-html'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    stylus = require('gulp-stylus');


// minify new images
gulp.task('images', function () {
    var imgSrc = './app/images/**/*',
        imgDst = './dist/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
        .pipe(notify({ message: 'images task complete' }));
});

// minify new or changed HTML pages
gulp.task('htmls', function () {
    var htmlSrc = ['./app/**/*.html', '!./app/index.html'],
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst))
        .pipe(notify({ message: 'htmls task complete' }));

    gulp.src(['./app/index.html'])
        .pipe(changed(htmlDst))
        //.pipe(preprocess({ context: { NODE_ENV: 'production', DEBUG: true } })) //To set environment variables in-line 
        .pipe(gulp.dest(htmlDst))
        .pipe(notify({ message: 'index copy to dist task complete' }));
});



// JS uglify
gulp.task('scripts', function () {

    gulp.src(['./app/scripts/**/*.js'])        
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(notify({ message: 'scripts uglify task complete' }));    
    
});

//gulp.task('concat', function(cb) {

//    gulp.src(['./app/scripts/app.js', './app/scripts/**/*.js'])
//        .pipe(concat('scripts.min.js'))
//        .pipe(stripDebug())
//        //.pipe(uglify())
//        .pipe(gulp.dest('./dist/scripts/'))
//        .pipe(notify({ message: 'scripts uglify and concat task complete' }));

//});

// CSS concat, auto-prefix and minify
gulp.task('styles', function () {
    gulp.src(['./app/styles/**/*.css'])
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(notify({ message: 'styles task complete' }));
    
});



// Clean
gulp.task('clean', function (cb) {
    del(['dist/styles', 'dist/scripts', 'dist/images',  'dist', '.temp'], cb);
    console.log("clean task finished");
});


// Watch
gulp.task('watch', function () {

    // Watch .css files
    gulp.watch('./app/styles/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('./app/scripts/**/*.js', ['scripts']);

    // Watch .html files
    gulp.watch('./app/**/*.html', ['htmls']);

    // Watch images files
    gulp.watch('./app/images/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['./dist/**']).on('change', livereload.changed);

});

// Default task
gulp.task('default', ['scripts', 'styles', 'images', 'htmls', 'watch']);

// Default task
//gulp.task('default', ['clean'], function () {
//    gulp.start( 'scripts', 'styles', 'images', 'htmls', 'copy', 'watch');
//});

