/* eslint angular/document-service: 0 */
import angular from 'angular';
import _ from 'lodash';

class Registrator {
    constructor() {
        this.modules = [];
    }

    bootstrap(main, modules) {
        document.addEventListener('DOMContentLoaded', () => {
            angular.bootstrap(document.getElementsByTagName('html')[0], [main]);
        });
        return angular.module(main, modules.concat(this.modules));
    }

    module(moduleName) {
        let module = null;
        if (_.some(this.modules, (name) => name === moduleName)) {
            module = angular.module(moduleName);
        } else {
            const loaded = _.attempt(angular.module, moduleName);
            module = _.isError(loaded) ? angular.module(moduleName, []) : angular.module(moduleName);
            this.modules.push(moduleName);
        }

        return module;
    }
}

export const Resolver = new Registrator();
