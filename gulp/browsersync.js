import brSync           from 'browser-sync';
import { app }          from './path';
import { Args }         from './args';

const instance = brSync.create();

const runBrSync = () => {
    instance.init({
        server: Args.build ? app.build : app.dev,
        port: Args.build ? 8000 : 9000,
        open: 'local',
        browser: 'google chrome',
        cors: true
    });
};

export {
    instance as BrowserSyncInst,
    runBrSync as RunBrowserSync
 };
