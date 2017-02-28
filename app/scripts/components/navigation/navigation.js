import Component from 'core/component';

@Component({name: 'navigation'})
export class NavigationController {
    constructor($mdSidenav, appStates) {
        'ngInject';
        this.$mdSidenav = $mdSidenav;
        this.states = appStates;
    }

    toggleNav() {
        this.$mdSidenav('left').toggle();
    }
}
