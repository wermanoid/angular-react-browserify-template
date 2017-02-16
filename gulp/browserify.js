/* eslint camelcase: [1, {properties: "never"}]*/
import browserify           from 'browserify';
import brfs                 from 'brfs';
import watchify             from 'watchify';
import bulkify              from 'bulkify';
import babelify             from 'babelify';
import eslintify            from 'eslintify';
import envify               from 'envify/custom';
import ngAnnotate           from 'browserify-ngannotate';
import gif                  from 'gulp-if';
import uglify               from 'gulp-uglify';
import sourcemaps           from 'gulp-sourcemaps';
import buffer               from 'vinyl-buffer';
import source               from 'vinyl-source-stream';
import {Args as args}       from './args';
import {app}                from './path';
import _                    from 'lodash';
import {Log, Handlers}      from './util';
import {BrowserSyncInst}    from './browsersync';

let bundler = null;
const isBuild = args.build;
const options = {
    entries: [app.js + '/app.main.js'],
    debug: !isBuild,
    cache: {},
    packageCache: {},
    extensions: [
        '.js', '.jsx'
    ],
    fullPath: !isBuild,
    paths: ['./node_modules', app.js]
};

const createAndExecuteBundle = (gulp) => {
    const opts = _.assign({}, watchify.args, options);

    bundler = browserify(opts)
        .transform(eslintify, {
            quiet: args.quiet,
            fix: args.fix,
            rules: {
                'no-console': (args.build ? 1 : 0)
            }
        })
        .transform(babelify)
        .transform(ngAnnotate)
        .transform(brfs)
        .transform(bulkify)
        .transform(envify({ENV_CONFIG: args.env}));

    const rebundle = () => {
        Log.start();
        const stamp = isBuild ? `.${Date.now()}` : '';
        return bundler
            .bundle()
            .on('error', Handlers.onError)
            .on('end', Log.end)
            .pipe(source(`main${stamp}.js`))
            .pipe(buffer())
            .pipe(gif(!isBuild, sourcemaps.init({loadMaps: true})))
            .pipe(gif(isBuild, uglify({
                compress: { drop_console: true }
            })))
            .pipe(gif(!isBuild, sourcemaps.write('./')))
            .pipe(gulp.dest(isBuild ? app.build : app.dev))
            .pipe(BrowserSyncInst.stream({once: true}));
    };

    if (!args.build) {
        bundler = watchify(bundler);
        bundler.on('update', () => rebundle(gulp));
    }
    bundler.on('log', Log.info);

    return rebundle();
};

function CreateBundler() {
    return createAndExecuteBundle(this);
}

export {CreateBundler};
