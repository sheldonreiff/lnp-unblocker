const { src, dest, series } = require('gulp');
const zipFolder = require('zip-folder');
const del = require('del');
const makeDir = require('make-dir');

function clean(){
    return del([
        'dist/**',
        'build/**',
    ], { force:true })
}

function copySrc() {
    return src('./src/*')
    .pipe(dest('./build'));
}

async function zipDist(cb){

    const zipCallback = error => {
        if(!error){
            cb();
        }else{
            console.log(error)
        }
    }

    makeDir('./dist');

    return zipFolder('./build', './dist/lnp-unblocker.zip', error => zipCallback)
}

exports.clean = clean;
exports.default = series(copySrc, zipDist);