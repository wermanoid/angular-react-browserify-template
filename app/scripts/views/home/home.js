import Component from 'core/component';

@Component({name: 'home'})
export class HomeController {
    constructor(tFactory, $log) {
        this.field = 1234;
        $log.info('Injected factory:', tFactory);
    }

    test() {
        return 'value';
    }
}
