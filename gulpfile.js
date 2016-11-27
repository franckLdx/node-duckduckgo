const del = require('del');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const typeScript = require('gulp-typeScript');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
const path = require('path');

class TsConfig {
    constructor(tsConfigLocation) {
      this._location = path.dirname(path.resolve('.', tsConfigLocation));
      this._tsConfig = require(tsConfigLocation);
    }

    get tsDir() { return `${this._location}/${this._tsConfig.rootDir}`; }

    get tsFiles() { return `${this.tsDir}/**/*.ts`; }

    get jsDir() { return `${this._location}/${this._tsConfig.compilerOptions.outDir}`; }

    get jsFiles() { return `${this.jsDir}/**/*.js`; }

    get mapFiles() { return `${this.jsDir}/**/*.map`; }

    get ambiantFiles() { return `${this.jsDir}/**/*.d.ts`; }

    get compilerOptions() { return this._tsConfig.compilerOptions; }

    get isSourceMap() { return this._tsConfig.compilerOptions.sourceMap || false; }

    cleanBuildTask() {
      return del([this.jsFiles, this.mapFiles, this.ambiantFiles]);
    }

    buildTask(clean=true) {
      if (clean) {
        this.cleanBuildTask();
      }
      const isSourcemap = this.isSourceMap;
      let pipe = gulp.src(this.tsFiles);
      if (isSourcemap) {
        pipe = pipe.pipe(sourcemaps.init());
      }
      pipe = pipe.pipe(typeScript(this.compilerOptions))
      if (isSourcemap) {
        pipe = pipe.pipe(sourcemaps.write('.'));
      }
      return pipe.pipe(gulp.dest(this.jsDir));
    }
}

const libTsConfig = new TsConfig('./src/tsconfig.json');
const testTsConfig = new TsConfig('./test/tsconfig.json');

const TEST_CONFIG = {
  coverageDir : './coverage',
}

gulp.task('lib:lint', function() {
  return gulp.src(libTsConfig.tsFiles)
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
});

gulp.task('lib:build', ['lib:lint'], () => {
  return libTsConfig.buildTask();
});

gulp.task('test:build', ['lib:build'], () => {
  return testTsConfig.buildTask();
});

gulp.task('test:coverage:clean', function() {
  return del(TEST_CONFIG.coverageDir);
});

gulp.task('test:instrument', ['test:build'], function () {
  return gulp.src(libTsConfig.jsFiles)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['test:coverage:clean', 'test:instrument'], function () {
  return gulp.src(testTsConfig.jsFiles)
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
