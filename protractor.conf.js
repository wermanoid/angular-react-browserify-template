require('babel-register');
const args = require('yargs').argv;
const port = args.build ? 8000 : 9000;

exports.config = {
    seleniumServerJar: './node_modules/selenium-standalone-jar/bin/selenium-server-standalone-2.45.0.jar',
    spec: ['app/e2e/**/*.js'],
    chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.26',
    baseUrl: `http://localhost:${port}`,
    capabilities: {
        browserName: 'chrome'
    }
};
