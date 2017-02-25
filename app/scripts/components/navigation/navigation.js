import Component from 'core/component';
import Controller from 'core/controller';

@Component('navigation')
export class NavigationComponent { }

@Controller('navigation')
export class NavigationController {
    constructor($mdSidenav, appStates, $log) {
        'ngInject';
        this.$mdSidenav = $mdSidenav;
        this.states = appStates;
        $log.info(this);
    }

    toggleNav() {
        this.$mdSidenav('left').toggle();
    }
}
