const gulp = require('gulp');
const plumber = require('gulp-plumber');
const slm = require("gulp-slm");
const prettify = require('gulp-jsbeautifier');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const filter = require('gulp-filter');
const config = require('../config.js');
const configTemplate = config.templates;
const errorHandler = require('../helpers/errorHandler');

gulp.task('slim', () => {
  return gulp.src(`${configTemplate.srcDir}**/*.slm`)
    .pipe(plumber({errorHandler}))
    .pipe(changed(config.path.dist, {extension: '.html'}))
    .pipe(filter(file => {
      return /templates[\\\/]pages/.test(file.path)
    }))
    .pipe(slm({useCache: false}))
    .pipe(prettify(config.prettify))
    .pipe(rename({dirname: '.'}))
    .pipe(gulp.dest(config.path.dist));
});
