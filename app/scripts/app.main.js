import App from 'core/app';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';

@App('main')
export class MainApp {
    constructor() {
        this.vendors = ['ui.router', 'main.templates', 'ngMaterial'];
    }
}
