// import Directive from './directive';
// import _ from 'lodash';
// import ReactDOM from 'react-dom';
// import React from 'react';
//
// const cache = new Map();
//
// const ReactComponent = (name) => {
//     if (!name) {throw Error('Can\'t register unnamed react component');}
//
//     return (ctor) => {
//         cache.set(_.kebabCase(name.trim()), ctor);
//     };
// };
//
// export const getComponent = cache.get.bind(cache);
// export default ReactComponent;
//
// @Directive('reactive')
// export class Reactive {
//     constructor() {
//         this.templateUrl = null;
//         this.scope = {
//             data: '=',
//             component: '@'
//         };
//     }
//     link(scope, element, attrs, ctrl) {
//         const component = getComponent(_.kebabCase(scope.component));
//         function componentRender(data) {
//             if (component) {
//                 const reactElement = React.createElement(component, {items: data});
//                 ReactDOM.render(reactElement, element[0].querySelector('#react-item') || element[0]);
//             }
//         }
//         ctrl.render = (data) => {
//             componentRender.call(ctrl, data);
//         };
//     }
//     controller($scope, $timeout) {
//         'ngInject';
//         $timeout(() => this.render($scope.data || [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]), 0);
//     }
// }
