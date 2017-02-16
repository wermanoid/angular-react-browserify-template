import {Args as args}   from './args';
import {app}            from './path';

function compile_fonts(){
    return this.src(app.fonts + '/**/*.*')
        .pipe(this.dest((args.build ? app.build : app.dev) + '/fonts'));
}

export { compile_fonts as FontCompile };
