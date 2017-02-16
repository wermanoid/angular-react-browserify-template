import clean            from 'gulp-clean';
import {Args as args}   from './args';
import {app}            from './path';

function cleanup(){
    return this.src(args.build ? app.build : app.dev)
        .pipe(clean());
}

export { cleanup as RunCleanup};
