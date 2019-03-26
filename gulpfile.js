const del = require('del');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const typeScript = require('gulp-typeScript');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
const path = require('path');
const useTsConfig = require('gulp-use-tsconfig');

const libTsConfig = './src/tsconfig.json';
const testTsConfig = './test/tsconfig.json';
const examplesTsConfig = './examples/ts/tsconfig.json';

const TEST_CONFIG = {
  coverageDir: './coverage',
}

gulp.task('test:clean', () => {
  return gulp.src(testTsConfig)
    .pipe(useTsConfig.clean());
});

gulp.task('test:lint', function () {
  return gulp.src(testTsConfig)
    .pipe(useTsConfig.lint());
});

gulp.task('test:build', ['lib:build', 'test:clean', 'test:lint'], () => {
  return gulp.src(testTsConfig)
    .pipe(useTsConfig.build());
});

gulp.task('test:coverage:clean', function () {
  return del(TEST_CONFIG.coverageDir);
});

gulp.task('test:instrument', ['lib:build'], function () {
  return gulp.src(['/lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['test:coverage:clean', 'test:build', 'test:instrument'], function () {
  return gulp.src('./testTmp/**/*Test.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      reporters: ['json'],
      reportOpts: { dir: TEST_CONFIG.coverageDir },
    })).on('end', remapCoverageFiles);
});

function remapCoverageFiles() {
  return gulp.src('./coverage/coverage-final.json')
    .pipe(remapIstanbul({
      basePath: './testTmp',
      reports: {
        'html': TEST_CONFIG.coverageDir,
        'text': process.output,
        'text-summary': process.output
      }
    }));
}

gulp.task('examples:lint', function () {
  return gulp.src(examplesTsConfig)
    .pipe(useTsConfig.lint());
});

gulp.task('examples:clean', () => {
  return gulp.src(examplesTsConfig)
    .pipe(useTsConfig.clean());
});

gulp.task('examples:build', ['examples:clean', 'examples:lint', 'lib:build'], () => {
  return gulp.src(examplesTsConfig)
    .pipe(useTsConfig.build());
});
