import Component from 'core/component';
import Controller from 'core/controller';

@Component('pager')
export class PagerComponent {
    constructor() {
        this.bindings = {
            page: '<'
        };
        this.templateUrl = null;
        this.template = '<div ng-include="\'doc.\' + vm.page + \'.html\'"></div>';
    }
}

@Controller('pager')
export class PagerController { }
