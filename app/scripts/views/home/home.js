import Component from 'core/component';

@Component({name: 'home'})
export class HomeController {
    constructor($timeout) {
        this.field = 1234;
        this.forTest = {
            a: 123,
            b: 234
        };
        $timeout(() => {this.forTest = Object.assign(this.forTest, {a: 56476});}, 1000);
    }

    test() {
        return 'value';
    }
}
