import { Resolver } from './register';
import { getArgs } from './helper';
/* eslint angular/log: 0*/
export default (config) => {
    let {name} = config;
    const {
        controller,
        controllerAs = 'vm',
        restrict = 'E',
        require,
        scope = false,
        template,
        templateUrl,
        transclude = false,
        module = 'main.directives'
    } = config;
    name = name.trim();

    return (DirectiveOrController) => {
        console.log('Directive:', DirectiveOrController);

        function dirFactory(...args) {
            const directive = controller ? Object.create(new DirectiveOrController(...args)) : {};
            Object.assign(directive, {
                controllerAs,
                name,
                restrict,
                require,
                scope,
                controller: controller ? `${name}Controller` : DirectiveOrController,
                [template ? 'template' : 'templateUrl']: template || templateUrl || `${name}.html`,
                transclude
            });

            return directive;
        }

        dirFactory.$inject = getArgs(DirectiveOrController);

        Resolver.module(module).directive(name, dirFactory);
    };
};

// import Resolver, {Dependency, toFactory} from './resolver';
// import ReactDOM from 'react-dom';
// import React from 'react';
// import _ from 'lodash';
//
// const toDrivedDirective = (base, name) => class BaseDirective extends base {
//     constructor() {
//         super(...arguments);
//         const modify = (prop, value) => {
//             if (this[prop] === null) {
//                 delete this[prop];
//             } else if (!this[prop]) {
//                 this[prop] = value;
//             }
//         };
//         modify('restrict', 'AE');
//         modify('templateUrl', name + '.html');
//         modify('controller', name + 'Controller');
//         modify('controllerAs', 'vm');
//         modify('scope', false);
//     }
// };
//
// const Directive = (name, module = 'main.directives') => {
//     if (!name) {throw Error('Can\'t register unnamed directive');}
//
//     return (ctor) => {
//         name = name.trim();
//         const directiveFactory = toFactory(toDrivedDirective(ctor, name));
//         Resolver.resolve(
// 			Dependency.directive,
// 			name,
// 			module,
// 			() => directiveFactory
// 		);
//     };
// };
//
// export default Directive;
//
// export class ReactiveDirective {
//     constructor(component) {
//         this.component = component;
//     }
//     link(scope, element, attrs, ctrl) {
//         function componentRender(component, data, opts) {
//             if (component) {
//                 const reactElement = React.createElement(component, _.assign({}, {items: data}, opts));
//                 ReactDOM.render(reactElement, element[0].querySelector('#react-item') || element[0]);
//             }
//         }
//         ctrl.render = (data) => {
//             componentRender.call(ctrl, this.component, data, ctrl.options);
//         };
//     }
// }
