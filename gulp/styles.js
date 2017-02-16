{once: true}import sass                 from 'gulp-sass';
import cleanCSS             from 'gulp-clean-css';
import sourcemaps           from 'gulp-sourcemaps';
import rename               from 'gulp-rename';
import gutil                from 'gulp-util';
import gif                  from 'gulp-if';
import {Args as args}       from './args';
import {app}                from './path';
import { BrowserSyncInst }  from './browsersync';

function compile_sass () {
    let name = args.build ? `.${Date.now()}` : '';
    return this.src(app.sass + '/main.scss')
        .pipe(gif(!args.build, sourcemaps.init({loadMaps: true})))
        .pipe(sass())
        .on('error', function(err){
            gutil.log(gutil.colors.red("Sass compile error:"), err.message, "\n\t");
            this.emit('end');
        })
        .pipe(rename(`main${name}.css`))
        .pipe(gif(args.build, cleanCSS()))
        .pipe(gif(!args.build, sourcemaps.write('./')))
        .pipe(this.dest(args.build ? app.build : app.dev))
        .pipe(BrowserSyncInst.stream({once: true}));
}

export { compile_sass as SassCompile };
