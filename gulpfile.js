const { src, dest, series } = require('gulp');
const zipFolder = require('zip-folder');
const del = require('del');
const makeDir = require('make-dir');

const clean = () => {
  return del([
    'dist/**',
    'build/**',
  ], { force: true });
}

const copySrc = () => {
  return src('./src/*')
    .pipe(dest('./build'));
}

const zipCallback = (error, cb) => {
    if (!error) {
        cb();
    } else {
        console.log(error);
    }
};

const zipDist = (cb) => {
  makeDir('./dist');
  return zipFolder('./build', './dist/lnp-unblocker.zip', error => zipCallback(error, cb));
}

exports.clean = clean;
exports.default = series(copySrc, zipDist);
