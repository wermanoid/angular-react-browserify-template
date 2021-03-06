const yargs = require('yargs');

const args = yargs
    .default({
        build: false,
        env: 'dev',
        quiet: false,
        fix: true,
        debug: false,
        'update-driver': false,
        tests: false,
        server: false
    })
    .alias('q', 'quiet')
    .alias('ud', 'update-driver')
    .argv;

export { args as Args };
