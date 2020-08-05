const { series } = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const babel = require('gulp-babel')

function appCSS(){
    return gulp.src('./css/**/*.css')
        .pipe(uglifycss({ "uglyCommens":true }))
        .pipe(concat('temporizador.min.css'))
        .pipe(gulp.dest('dist/css'))
}

function appJS(){
    return gulp.src('./js/**/*.js')
        .pipe(babel({
            comments: false,
            presets: ["env"]
        }))
        .on('error', err => console.log("erro: " + e))
        .pipe(uglify())
        .pipe(concat('temporizador.min.js'))
        .pipe(gulp.dest('dist/js'))
}

module.exports.default = series(appCSS, appJS)