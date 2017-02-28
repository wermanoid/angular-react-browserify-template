import Component from 'core/component';

@Component({
    name: 'pager',
    bindings: { page: '<' },
    template: '<div ng-include="\'doc.\' + vm.page + \'.html\'"></div>'
})
export class PagerController { }
