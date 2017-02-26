import { app }           from './path';
import { ExecuteInject } from './inject';
import watch             from 'gulp-watch';
import {
    BundlerCache,
    rebundle
}                        from './browserify';
import _                 from 'lodash';
import gutil             from 'gulp-util';

function RunWatchers() {
    this.watch(`${app.root}/index.html`, ['compile:html:index']);

    watch(`${app.sass}/**/*.scss`, () => this.start('compile:css'));

    watch(`${app.js}/**/*.html`, () => this.start('compile:html:views'));

    watch(`${app.img}/**/*.*`, () => this.start('compile:img'));

    watch([`${app.js}/**/*.js`, `${app.js}/**/*.jsx`], (stream) => {
        if (stream.event === 'add' || stream.event === 'unlink') {
            for (const key in BundlerCache) {
                if (stream.path === key || _.endsWith(key, `${app.js}/core/moduler.js`)) {
                    gutil.log(`${gutil.colors.green('Remove key from cache: ' + key)}...`);
                    delete BundlerCache[key];
                }
            }
            rebundle();
        }
    });

    watch([`${app.dev}/**/*.js`, `${app.dev}/**/*.css`], (stream) => {
        if (stream.event === 'add' || stream.event === 'unlink') {
            this::ExecuteInject();
        }
    });
}

export { RunWatchers };
