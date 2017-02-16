import { app }           from './path';
import { ExecuteInject } from './inject';

function RunWatchers() {
    this.watch(`${app.sass}/**/*.scss`, ['compile:css']);
    this.watch(`${app.root}/index.html`, ['compile:html:index']);
    this.watch(`${app.fonts}/**/*.*`, ['compile:font']);
    this.watch(`${app.js}/**/*.html`, ['compile:html:views']);
    this.watch([`${app.js}/**/*.js`, `${app.js}/**/*.jsx`], (event) => {
        if (event.type === 'added' || event.type === 'deleted' || event.type === 'renamed') {
            this.start('compile:js');
        }
    });
    this.watch([`${app.dev}/**/*.js`, `${app.dev}/**/*.css`], (event) => {
        if (event.type === 'added' || event.type === 'deleted' || event.type === 'renamed') {
            this::ExecuteInject();
        }
    });
}

export { RunWatchers };
