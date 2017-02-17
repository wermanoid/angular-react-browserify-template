import {Args as args}   from './args';
import {app}            from './path';

// const bootstrapPath = 'node_modules/bootstrap-sass/assets/fonts';
const faPath = 'node_modules/font-awesome/fonts';

function FontCompile() {
    return this.src([
        `${faPath}/**/*.*`,
        // `${bootstrapPath}/**/*.*`,
        `${app.fonts}/**/*.*`
    ])
    .pipe(this.dest((args.build ? app.build : app.dev) + '/fonts'));
}

export { FontCompile };
