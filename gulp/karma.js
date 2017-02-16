/* eslint no-process-exit: 0, angular/log: 0*/
import {Server} from 'karma';
import { Args } from './args';

const RunKarma = () => {
    const serv = new Server({
        configFile: `${__dirname}/../karma.config.js`,
        singleRun: Args.build
    }, (msg) => {
        if (msg) {
            console.log(`Karma failed with code: ${msg}`);
            process.exit(0);
        }
        // cb(msg);
    });
    serv.start();
};

export { RunKarma };
