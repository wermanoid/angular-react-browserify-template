/* eslint no-process-exit: 0*/
import gutil            from 'gulp-util';
import prettyHrtime     from 'pretty-hrtime';
import notify           from 'gulp-notify';
import { Args }  from './args';

let startTime = null;
const Log = {
    start() {
        startTime = process.hrtime();
        gutil.log(`${gutil.colors.green('Start rebundling')}...`);
    },
    info(msg) {
        gutil.log(`Browserify log: ${gutil.colors.magenta(msg)}`);
    },
    end() {
        const taskTime = process.hrtime(startTime);
        const prettyTime = prettyHrtime(taskTime);
        gutil.log(`${gutil.colors.green('Finished rebundling')} in ${gutil.colors.magenta(prettyTime)}`);
    }
};

const Handlers = {
    onError: function(error) {
        if (Args.build) {
            // Log the error and stop the process
            // to prevent broken code from building
            gutil.log(gutil.colors.red(error));
            process.exit(1);
        } else if (!error.message) { // Send error to notification center with gulp-notify
            gutil.log(gutil.colors.red(error));
            this.emit('end');
        } else {
            notify.onError({
                title: 'Compile Error',
                message: '<%= error.message %>'
            }).call(this, error);
        }
    }
};

export { Log, Handlers };
