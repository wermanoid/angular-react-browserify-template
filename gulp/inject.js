import inject               from 'gulp-inject';
import { Args }      from './args';
import { app }              from './path';
import { BrowserSyncInst }  from './browsersync';

function ExecuteInject() {
    const root = Args.build ? app.build : app.dev;
    const injectsJs = this.src([root + '/vendors/**/*.js', root + '/**/*.js'], {
        read: false
    });
    const injectsCss = this.src([root + '/vendors/**/*.css', root + '/**/*.css'], {
        read: false
    });

    return this.src(root + '/index.html')
        .pipe(inject(injectsJs, {
            relative: true,
            addRootSlash: false
        }))
        .pipe(inject(injectsCss, {
            relative: true,
            addRootSlash: false
        }))
        .pipe(this.dest(Args.build ? app.build : app.dev))
        .pipe(BrowserSyncInst.stream());
}

function IndexCompile() {
    return this.src(app.root + '/index.html')
        .pipe(this.dest(Args.build ? app.build : app.dev))
        .on('end', this::ExecuteInject);
}

export { IndexCompile, ExecuteInject };
