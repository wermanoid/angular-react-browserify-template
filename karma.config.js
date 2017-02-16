import istanbul from 'browserify-istanbul';
import isparta  from 'isparta';
import {argv as args} from 'yargs';

const Config = (config) => {
    const options = {
        autoWatch: true,
        colors: true,
        singleRun: args.build,
        logLevel: args.debug ? config.LOG_DEBUG : config.LOG_INFO,
        basePath: './',
        browsers: ['Chrome'],
        frameworks: ['jasmine', 'browserify'],
        proxies: {
            '/': 'http://localhost:9876/'
        },
        urlRoot: '/__karma__/',
        preprocessors: {
            'app/scripts/**/*.js': ['browserify'],
            'app/scripts/**/*.jsx': ['browserify']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'html', subdir: 'html' }
                // { type: 'text', subdir: '.' }
                // { type: 'lcovonly' }
            ],
            instrumenterOptions: {
                istanbul: {
                    noCompact: true
                }
            },
            instrumenter: {
                'app/scripts/**/*.spec.js': 'istanbul'
            },
            includeAllSources: true
        },
        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        },
        files: [
            'app/scripts/app.main.js',
            // 'node_modules/angular-mocks/angular-mocks.js',
            'app/scripts/**/*.spec.js'
        ],
        browserify: {
            debug: true,
            paths: ['app/scripts'],
            extensions: ['.js', '.jsx'],
            transform: [
                'babelify',
                'browserify-ngannotate',
                'bulkify',
                istanbul({
                    instrumenter: isparta,
                    instrumenterConfig: { embedSource: true },
                    ignore: ['**/node_modules/**', '/**/*.spec.js']
                })
            ]
        }
    };
    config.set(options);
};

export default Config;
