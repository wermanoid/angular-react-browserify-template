import {Args as args}   from './args';
import {app}            from './path';
import gif              from 'gulp-if';
import changed          from 'gulp-changed';
import imagemin         from 'gulp-imagemin';

function process_images(){
    const target = args.build ? app.build : app.dev;
    const pathToDest = `${target}/images`;
    return this.src(`${app.img}/**/*.*`)
        .pipe(changed(pathToDest))
        .pipe(gif(args.build, imagemin()))
        .pipe(this.dest(pathToDest));
}

export { process_images as ImgCompile };
