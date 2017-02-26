import Component from 'core/component';
import Controller from 'core/controller';

@Component('documentation')
export class DocsComponent { }

@Controller('documentation')
export class DocsController {
    constructor($stateParams) {
        'ngInject';
        this.page = $stateParams.item;
    }
}
