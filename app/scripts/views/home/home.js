import Controller from 'core/controller';
import Component from 'core/component';

@Component('home')
export class HomeComponent { }

@Controller('home')
export class HomeController {
    constructor($log) {
        $log.info('test here');
        this.field = 1234;
    }

    test() {
        return 'value';
    }
}
