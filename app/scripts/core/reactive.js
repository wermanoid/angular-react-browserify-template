import component from './component';
import ReactDOM from 'react-dom';
import React from 'react';

export default ({name}) => {
    return (ReactComponent) => {
        const register = component({
            name,
            template: ' ',
            bindings: {props: '<'}
        });
        class Reactive {
            constructor($element) {
                'ngInject';
                this.el = $element;
            }
            set props(value) {
                ReactDOM.render(<ReactComponent {...value} />, this.el[0]);
            }
        }
        register(Reactive);
    };
};
