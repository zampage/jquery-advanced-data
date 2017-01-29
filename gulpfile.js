//requirements
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    header = require('gulp-header'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babel = require('gulp-babel'),
    runSequence = require('run-sequence');

//paths
var dir = {
    in: './jquery-advanced-data.js',
    out: './dist/',
    src: './src/**/*.js',
    browserifyName: 'jquery-advanced-data.js'
};

//error handling
var error = function(msg){
    gutil.log(gutil.colors.red('[ERROR]: ' + msg.toString()));
};

//license
var pkg = require('./package.json');
var license = ['/**',
    ' * @author <%= pkg.author %>',
    ' * @website <%= pkg.homepage %> ',
    ' * @version <%= pkg.version %>',
    ' * ',
    ' * <%= pkg.description %>',
    ' */',
    ''].join('\n');

//browserify
gulp.task('browserify', function(){
    return browserify(dir.in).bundle()
        .on('error', error)
        .pipe(source(dir.browserifyName))
        .pipe(gulp.dest(dir.out));
});

//build tasks
gulp.task('compile', function(){
    return gulp.src(dir.out + dir.browserifyName)
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', error)
        .pipe(header(license, {pkg: pkg}))
        .pipe(gulp.dest(dir.out));
});

gulp.task('uglify', function(){
    gulp.src(dir.out + dir.browserifyName)
        .pipe(uglify({preserveComments: 'license'}))
        .on('error', error)
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(dir.out));
});

//build
gulp.task('build', function(callback){
    runSequence('browserify', 'compile', 'uglify', callback);
});

//watch
gulp.task('watch', function(){
    gulp.watch(dir.in, ['build']);
    gulp.watch(dir.src, ['build']);
});

//default
gulp.task('default', ['build', 'watch']);