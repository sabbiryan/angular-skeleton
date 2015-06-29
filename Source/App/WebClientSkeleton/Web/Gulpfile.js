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
    //util = require('gulp-util'),
    //file = require('gulp-file'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    minifyHTML = require('gulp-minify-html'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    //rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    notify = require('gulp-notify'),
    //cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    //preprocess = require('gulp-preprocess'),
    //bowerFiles = require('main-bower-files'),
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



// JS concat, strip debugging and minify
gulp.task('scripts', function () {

    gulp.src(['./app/scripts/**/*.js'])        
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('./.temp/scripts/'))
        .pipe(notify({ message: 'scripts minify to temp task complete' }));

    gulp.src(['./.temp/scripts/app.js', './.temp/scripts/**/*.js'])
        .pipe(concat('scripts.min.js'))
        .pipe(stripDebug())
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(notify({ message: 'scripts concat task complete' }));
    
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

// SASS Styles compressed to css
gulp.task('sass', function () {
    gulp.src('app/sass/**/*.scss', { style: 'expanded' })
        .pipe(concat('styles.sass.min.css'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/styles'))        
        .pipe(notify({ message: 'sass task complete' }));
});





//minified css , js inject to index.html page
gulp.task('index-dev', function () {

    var target = gulp.src('./app/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(['./app/scripts/**/*.js', './app/styles/**/*.css'], { read: false });

    target
        .pipe(inject(sources))
        .pipe(gulp.dest('./app'))
        .pipe(notify({ message: 'index-dev task complete' }));

});

//minified css , js inject to index.html page
gulp.task('index-dev-angular', function () {

    //Injecting AngularJS scripts for development
    gulp.src('./app/index.html')
        .pipe(inject(
            gulp.src('./app/scripts/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here 
            .pipe(angularFilesort())
        ))
        .pipe(gulp.dest('./app'))
        .pipe(notify({ message: 'Injecting AngularJS scripts to index.html task complete' }));

});

//minified css , js inject to index.html page
gulp.task('index', function () {

    var target = gulp.src('./dist/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(['./dist/scripts/**/*.js', './dist/libs/styles/**/*.css', './dist/styles/**/*.css'], { read: false });

    target
        .pipe(inject(sources))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({ message: 'index task complete' }));

});

//minified css , js inject to index.html page
gulp.task('index-angular', function () {

    //Injecting AngularJS scripts for development
    gulp.src('./dist/index.html')
        .pipe(inject(
            gulp.src('./dist/scripts/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here 
            .pipe(angularFilesort())
        ))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({ message: 'Injecting AngularJS scripts to index.html task complete' }));

});
gulp.task('TASKNAME', function() {
    return gulp.src('index.tpl.html')
        .pipe(inject(
            gulp.src(bower({ paths: 'app' }), { read: false }),
            { name: 'bower', relative: true, transform: gulpInjectVersioningTranform }))
        .pipe(inject(
            gulp.src(javaScriptFiles, { read: false }),
            { relative: true, transform: gulpInjectVersioningTranform }))
        .pipe(inject(
            gulp.src(cssFiles, { read: false }),
            { relative: true, transform: gulpInjectVersioningTranform }))
        .pipe( /* next step */);
});

var gulpInjectVersioningTranform = function (filepath, i, length, sourceFile, targetFile) {
        var extname = path.extname(filepath);
      if (extname === '.js' || extname === '.css') {
            filepath += '?v=' + version;
             return inject.transform.apply(inject.transform, [filepath, i, length, sourceFile, targetFile]);
         }
       else {
             return inject.transform.apply(inject.transform, arguments);
      }
};




//others required files copy to dist for production
gulp.task('copy', function() {
    gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));

    gulp.src(['./app/libs/styles/**/*.css'])
        .pipe(concat('vendors.min.css'))
        //.pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/libs/styles/'))
        .pipe(notify({ message: 'copy libs styles minify & concat task complete' }));

    gulp.src(['./app/libs/scripts/**/*.js'])
        //.pipe(concat('scripts.min.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/libs/scripts/'))
        .pipe(notify({ message: 'copy libs scripts minify task complete' }));
});


// Clean
gulp.task('clean', function (cb) {
    del(['dist/styles', 'dist/scripts', 'dist/images',  'dist', '.temp'], cb);
    console.log("clean task finished");
});


// Watch
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('./app/sass/**/*.scss', ['sass']);

    // Watch .css files
    gulp.watch('./app/styles/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('./app/scripts/**/*.js', ['scripts']);

    // Watch .html files
    gulp.watch('./app/**/*.html', ['htmls']);

    // Watch images files
    gulp.watch('./app/images/**/*', ['images']);

    // Watch copy files
    gulp.watch('./app/fonts/**/*', ['copy']);
    gulp.watch('./app/libs/styles/**/*', ['copy']);
    gulp.watch('./app/libs/scripts/**/*', ['copy']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['./dist/**']).on('change', livereload.changed);

});

//// Default task
//gulp.task('default', [ 'scripts', 'sass', 'styles', 'images', 'htmls', 'watch']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start( 'scripts', 'sass', 'styles', 'images', 'htmls', 'copy', 'watch');
});

