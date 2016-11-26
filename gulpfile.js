const del = require('del');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const typeScript = require('gulp-typeScript');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

const codeConfigFile = require('./tsconfig.json');

class TsConfig {
    constructor(tsConfig) {
      this._tsConfig = tsConfig;
    }

    get srcDir() { return this._tsConfig.rootDir; }

    get srcFiles() { return `${this.srcDir}/**/*.ts`; }

    get buildDir() { return this._tsConfig.compilerOptions.outDir; }

    get buildFiles() { return `${this.buildDir}/**/*.js`; }

    get compilerOptions() { return this._tsConfig.compilerOptions; }
}

const codeConfig = new TsConfig(codeConfigFile);

const testConfig = {
  dir: './test',
  get files() { return `${this.dir}/**/*Test.js`; },
  coverageDir : './coverage',
}

gulp.task('lint', function() {
  return gulp.src(codeConfig.srcFiles)
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
});

gulp.task('build:pre', function() {
  del(codeConfig.buildDir);
});

gulp.task('build', ['build:pre', 'lint'], () => {
  return gulp.src(codeConfig.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(typeScript(codeConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(codeConfig.buildDir));
});

gulp.task('test:clean', function() {
  return del(testConfig.coverageDir);
});

gulp.task('test:pre', ['test:clean','build'], function () {
  return gulp.src(codeConfig.buildFiles)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['test:pre'], function () {
  return gulp.src(testConfig.files)
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      reporters: [ 'json' ],
      reportOpts: { dir: testConfig.coverageDir },
    })).on('end', remapCoverageFiles);
});

function remapCoverageFiles() {
    return gulp.src('./coverage/coverage-final.json')
    .pipe(remapIstanbul({
        reports: {
            'html': './coverage'
        }
    }));
}
