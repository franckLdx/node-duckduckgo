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

const TEST_CONFIG = {
  coverageDir : './coverage',
}

gulp.task('lib:lint', function() {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
});

gulp.task('lib:clean', () => {
  return gulp.src(libTsConfig)
    .pipe(useTsConfig.build());
});

gulp.task('lib:build', ['lib:clean', 'lib:lint'], () => {
  return gulp.src(libTsConfig)
    .pipe(useTsConfig.build());
});

gulp.task('test:clean', () => {
  return gulp.src(testTsConfig)
    .pipe(useTsConfig.build());
});

gulp.task('test:build', ['lib:build'], () => {
  return gulp.src(testTsConfig)
    .pipe(useTsConfig.build());
});

gulp.task('test:coverage:clean', function() {
  return del(TEST_CONFIG.coverageDir);
});

gulp.task('test:instrument', ['test:build'], function () {
  return gulp.src('/lib/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['test:coverage:clean', 'test:instrument'], function () {
  return gulp.src('/lib/**/*.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      reporters: [ 'json' ],
      reportOpts: { dir: TEST_CONFIG.coverageDir },
    })).on('end', remapCoverageFiles);
});

function remapCoverageFiles() {
    return gulp.src('./coverage/coverage-final.json')
    .pipe(remapIstanbul({
        reports: {
            'html': TEST_CONFIG.coverageDir,
            'text': process.output,
            'text-summary': process.output
        }
    }));
}
