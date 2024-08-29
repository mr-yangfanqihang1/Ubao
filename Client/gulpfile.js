const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoPrefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

const libHandle = () => {
    return gulp.src('./src/lib/*').pipe(gulp.dest('./dist/lib'));
}

const cssHandle = () => {
    return gulp.src('./src/css/*.css').pipe(autoPrefixer()).pipe(cssmin()).pipe(gulp.dest('./dist/css'));
}

const jsHandle = () => {
    return gulp.src('./src/js/*.js').pipe(babel({
        presets: ['@babel/env']
    })).pipe(uglify()).pipe(gulp.dest('./dist/js'));
}

const htmlHandle = () => {
    return gulp.src('./src/*.html').pipe(htmlmin({
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        collapseBooleanAttributes: true
    })).pipe(gulp.dest('./dist'));
}

module.exports = {
    libHandle,
    cssHandle,
    jsHandle,
    htmlHandle
};

module.exports.default = gulp.parallel(htmlHandle, jsHandle);