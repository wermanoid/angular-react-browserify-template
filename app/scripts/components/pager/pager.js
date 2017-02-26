import Component from 'core/component';
import Controller from 'core/controller';

@Component('pager')
export class PagerComponent {
    constructor() {
        this.bindings = {
            page: '<'
        };
        this.templateUrl = null;
        this.template = '<div>some page and: {{vm.page}}</div>';
    }
}

@Controller('pager')
export class PagerController { }
