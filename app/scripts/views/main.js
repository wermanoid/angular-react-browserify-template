import Controller from 'core/controller';

@Controller('main')
export class Main {
    constructor($log) {
        $log.info('test here');
        this.field = 1234;
    }

    test() {
        return 'value';
    }
}
