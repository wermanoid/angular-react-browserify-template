import App from 'core/app';
import 'angular-ui-router';

@App('main')
export class MainApp {
    constructor() {
        this.vendors = ['ui.router', 'main.templates'];
    }
}
