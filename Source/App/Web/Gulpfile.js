/*
 * 
 npm install --save gulp gulp-plumber gulp-changed gulp-minify-html gulp-autoprefixer gulp-minify-css gulp-uglify gulp-imagemin gulp-rename gulp-concat gulp-strip-debug gulp-notify gulp-livereload del gulp-inject gulp-jshint
 *
 */

/*
 * 
 npm uninstall gulp gulp-plumber gulp-changed gulp-minify-html gulp-autoprefixer gulp-minify-css gulp-uglify gulp-imagemin gulp-rename gulp-concat gulp-strip-debug gulp-notify gulp-livereload del gulp-inject gulp-jshint
 * 
 */


var gulp = require('gulp'),
    
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),

	minifyHTML = require('gulp-minify-html'),

	stripDebug = require('gulp-strip-debug'),
	jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
        
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    
	livereload = require('gulp-livereload'),
    del = require('del'),    
    
    inject = require('gulp-inject');


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
        .pipe(gulp.dest(htmlDst))
        .pipe(notify({ message: 'index copy to dist task complete' }));
});



// JS concat & uglify 
gulp.task('scripts', function () {

    gulp.src(['./app/scripts/root.config.js','./app/scripts/**/*.config.js'])        
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(plumber())
        .pipe(concat('config-scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(notify({ message: 'config scripts task complete' }));

    gulp.src(['./app/scripts/root.directive.js', './app/scripts/**/*.directive.js'])
       .pipe(jshint())
       .pipe(jshint.reporter('default'))
       .pipe(plumber())
       .pipe(concat('directive-scripts.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./dist/scripts/'))
       .pipe(notify({ message: 'directive scripts task complete' }));

    gulp.src(['./app/scripts/root.service.js', './app/scripts/**/*.service.js'])
       .pipe(jshint())
       .pipe(jshint.reporter('default'))
       .pipe(plumber())
       .pipe(concat('service-scripts.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./dist/scripts/'))
       .pipe(notify({ message: 'service scripts task complete' }));

    gulp.src(['./app/scripts/root.controller.js', './app/scripts/**/*.controller.js'])
       .pipe(jshint())
       .pipe(jshint.reporter('default'))
       .pipe(plumber())
       .pipe(concat('controller-scripts.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./dist/scripts/'))
       .pipe(notify({ message: 'controller scripts task complete' }));
    
});


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
    gulp.watch('./app/scripts/**/*.config.js', ['scripts']);
    gulp.watch('./app/scripts/**/*.directive.js', ['scripts']);
    gulp.watch('./app/scripts/**/*.service.js', ['scripts']);
    gulp.watch('./app/scripts/**/*.controller.js', ['scripts']);

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
gulp.task('default', ['clean','scripts', 'styles', 'images', 'htmls', 'watch' ]);


