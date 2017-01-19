//requirements
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    header = require('gulp-header'),
    babel = require('gulp-babel');

//paths
var dir = {
    in: 'jquery-advanced-data.js',
    out: 'dist/'
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

//build tasks
gulp.task('build-js', function(){
    gulp.src(dir.in)
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', error)
        .pipe(header(license, {pkg: pkg}))
        .pipe(gulp.dest(dir.out))
        .pipe(uglify({preserveComments: 'license'}))
        .on('error', error)
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(dir.out))
});

//build
gulp.task('build', ['build-js']);

//watch
gulp.task('watch', function(){
    gulp.watch(dir.in, ['build']);
});

//default
gulp.task('default', ['build', 'watch']);