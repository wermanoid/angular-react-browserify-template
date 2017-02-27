import App from 'core/app';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';

@App({
    name: 'main',
    modules: ['ui.router', 'main.templates', 'ngMaterial']
})
export class MainApp {
    run($log) {
        'ngInject';
        $log.info('application run');
    }
}
