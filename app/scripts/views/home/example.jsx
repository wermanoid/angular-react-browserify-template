/* eslint angular/log: 0 */
import React from 'react';
import Reactive from 'core/reactive';

@Reactive({name: 'reactExample'})
export class Example extends React.Component {
    static propTypes() {
        return {
            a: React.PropTypes.string
        };
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<h1>React component item here! And a = {this.props.a}</h1>);
    }
}
