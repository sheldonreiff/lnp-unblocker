const { src, dest, series } = require('gulp');
const zipFolder = require('zip-folder');
const del = require('del');

function copySrc() {
    return src('./src/*')
    .pipe(dest('./build/lnp-unblocker'));
}

function cleanDist(){
    return del('dist/**', { force:true })
}

function cleanBuild(){
    return del('build/**', { force:true })
}

async function zipDist(cb){

    const zipCallback = error => {
        if(!error){
            cb();
        }else{
            console.log(error)
        }
    }

    return zipFolder('./build', './dist/lnp-unblocker.zip', error => zipCallback)
}

exports.default = series(cleanDist, cleanBuild, copySrc, zipDist);