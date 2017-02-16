/* eslint angular/document-service: 0 */
import _ from 'lodash';
import { Enumeration } from './enum';
import angular from 'angular';

export const Dependency = new Enumeration('controller', 'factory', 'service',
	'directive', 'component', 'filter');

export const getArgs = (func) => {
	// First match everything inside the function argument parens.
    const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
	// Split the arguments string into an array comma delimited.
    return args
		.split(',')
		.map((arg) => arg.replace(/\/\*.*\*\//, '').trim())// Ensure no inline comments are parsed and trim the whitespace.
		.filter((arg) => arg); // Ensure no undefined values are added.
};

export const toFactory = (constructor) => {
    if (_.isArray(constructor)) {
        const ctor = constructor.pop();
        ctor.$inject = _.clone(constructor);
        constructor = ctor;
    }
    const factory = (...arg) => {
        return new constructor(...arg);
    };
    factory.$inject = constructor.$inject || getArgs(constructor);
    return factory;
};

class AngularDependencyResolver {
    constructor() {
        this.modules = [];
    }

    bootstrap(name, vendors, onLoaded) {

        this.modules = this.modules.concat(vendors);
        const module = angular.module(name, this.modules);
        onLoaded(module);

        document.addEventListener('DOMContentLoaded', () => {
            angular.bootstrap(document.getElementsByTagName('html')[0], [name]);
        });
    }

    resolve(dependency, dependencyName, moduleName, factory) {
        let module = null;
        if (_.some(this.modules, (name) => name === moduleName)) {
            module = angular.module(moduleName);
        } else {
            const loaded = _.attempt(angular.module, moduleName);
            module = _.isError(loaded) ? angular.module(moduleName, []) : angular.module(moduleName);
            this.modules.push(moduleName);
        }
        module[dependency](dependencyName, factory());
        angular.module(name, this.modules);
    }
}

const Resolver = new AngularDependencyResolver();

export default Resolver;
