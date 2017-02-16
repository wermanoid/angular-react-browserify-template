import {Args as args}   from './args';
import {app}            from './path';

const bootstrapPath = 'node_modules/bootstrap-sass/assets';

function FontPreCompile() {
    return this.src(`${bootstrapPath}/fonts/**/*.*`)
        .pipe(this.dest(app.fonts));
}

function FontCompile() {
    return this.src(app.fonts + '/**/*.*')
        .pipe(this.dest((args.build ? app.build : app.dev) + '/fonts'));
}

export { FontCompile, FontPreCompile };
