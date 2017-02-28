import Component from 'core/component';

@Component({name: 'documentation'})
export class DocsController {
    constructor($stateParams) {
        'ngInject';
        this.page = $stateParams.item;
    }
}
