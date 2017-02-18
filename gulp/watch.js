import { app }           from './path';
import { ExecuteInject } from './inject';
import watch             from 'gulp-watch';
import {BundlerCache}    from './browserify';
import _                 from 'lodash';

function RunWatchers() {
    this.watch(`${app.root}/index.html`, ['compile:html:index']);

    watch(`${app.sass}/**/*.scss`, () => this.start('compile:css'));

    watch(`${app.js}/**/*.html`, () => this.start('compile:html:views'));

    watch([`${app.js}/**/*.js`, `${app.js}/**/*.jsx`], (stream, done) => {
        if(stream.event === 'add' || stream.event === 'unlink') {
            for(let key in BundlerCache){
                if(stream.path == key || _.endsWith(key, `${app.js}/core/moduler.js`)){
                    console.log('Remove key from cache:', key);
                    delete BundlerCache[key];
                }
            }
            this.start('compile:js');
        }
    });

    watch([`${app.dev}/**/*.js`, `${app.dev}/**/*.css`], (stream, done) => {
        if(stream.event === 'add' || stream.event === 'unlink') {
            this::ExecuteInject();
        }
    });
}

export { RunWatchers };
