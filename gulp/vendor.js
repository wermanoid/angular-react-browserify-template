import {Args as args}   from './args';
import {app}            from './path';

function compile_vendor(){
    return this.src(app.vendor + '/**/*.*')
        .pipe(this.dest((args.build ? app.build : app.dev) + '/vendors'));
}

export { compile_vendor as VendorCompile };
