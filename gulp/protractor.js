/* eslint camelcase:0, no-process-exit: 0 */
import {
    protractor,
    webdriver_update,
    webdriver
} from 'gulp-protractor';
import { app }              from './path';
import { BrowserSyncInst }  from './browsersync';
import gulp                 from 'gulp';
import {Args}               from './args';

gulp.task('webdriverUpdate', webdriver_update);
gulp.task('webdriver', webdriver);

function E2ETests(cb) {
    this.src(`${app.e2e}/**/*.js`)
        .pipe(protractor({
            // configFile: 'protractor.conf.js',
            args: [Args.build ? '--build' : '']
        }))
        .on('end', () => {
            BrowserSyncInst.cleanup();
            cb();
            process.exit(0);
        });
}

export {
    E2ETests
};
