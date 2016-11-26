const del = require('del');
const gulp = require('gulp');
const tslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const typeScript = require('gulp-typeScript');

const tsConfig = require('./tsconfig.json');

const SRC_CONFIG = {
  srcDir: tsConfig.rootDir,
  get tsFiles() { return `${this.srcDir}/**/*.ts`; },
};

const LIB_CONFIG = {
  libDir: tsConfig.compilerOptions.outDir,
};

gulp.task('lint', function() {
  return gulp.src(SRC_CONFIG.tsFiles)
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
});

gulp.task('cleanLib', function() {
  del(LIB_CONFIG.libDir);
});

gulp.task('build', ['cleanLib', 'lint'], () => {
  return gulp.src(SRC_CONFIG.tsFiles)
    .pipe(sourcemaps.init())
    .pipe(typeScript(tsConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(LIB_CONFIG.libDir));
});
