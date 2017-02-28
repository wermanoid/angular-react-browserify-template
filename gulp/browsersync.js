import brSync           from 'browser-sync';
import { app }          from './path';
import { Args }         from './args';
import os               from 'os';

const instance = brSync.create();
const browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
    os.platform() === 'win32' ? 'chrome' : 'firefox'));

const runBrSync = () => {
    instance.init({
        server: Args.build ? app.build : app.dev,
        port: Args.build ? 8000 : 9000,
        open: 'local',
        browser,
        cors: true
    });
};

export {
    instance as BrowserSyncInst,
    runBrSync as RunBrowserSync
 };
