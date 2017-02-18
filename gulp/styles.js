import sass                 from 'gulp-sass';
import cleanCSS             from 'gulp-clean-css';
import sourcemaps           from 'gulp-sourcemaps';
import rename               from 'gulp-rename';
import gutil                from 'gulp-util';
import gif                  from 'gulp-if';
import {Args as args}       from './args';
import {app}                from './path';
import { BrowserSyncInst }  from './browsersync';

const materialPath = 'node_modules/angular-material';
const faPath = 'node_modules/font-awesome/scss';

function HandleError(err) {
    gutil.log(gutil.colors.red('Sass compile error:'), err.message, '\n\t');
    this.emit('end');
}

function SassCompile() {
    const name = args.build ? `.${Date.now()}` : '';
    return this.src(`${app.sass}/main.scss`)
        .pipe(gif(!args.build, sourcemaps.init({loadMaps: true})))
        .pipe(sass({includePaths: [
            materialPath,
            faPath
        ]}))
        .on('error', HandleError)
        .pipe(rename(`main${name}.css`))
        .pipe(gif(args.build, cleanCSS()))
        .pipe(gif(!args.build, sourcemaps.write('./')))
        .pipe(this.dest(args.build ? app.build : app.dev))
        .pipe(BrowserSyncInst.stream({once: true}));
}

export { SassCompile };
