import App from 'core/app';
import 'angular-route';

@App('main')
export class MainApp {
    constructor() {
        this.vendors = ['ngRoute', 'main.templates'];
    }
}
