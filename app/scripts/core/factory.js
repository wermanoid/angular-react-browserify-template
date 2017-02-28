import { Resolver } from './register';
import {getArgs} from './helper';
import _ from 'lodash';

export default ({name, module = 'main.factories'}) => {
    if (!name) {throw Error('Can\'t register unnamed factory');}

    return (Factory) => {
        if (_.isArray(Factory)) {
            const Constructor = Factory[Factory.length - 1];
            Factory[Factory.length - 1] = (...args) => new Constructor(...args);
        } else {
            const Constructor = Factory;
            Factory = (...args) => new Constructor(...args);
            Factory.$inject = getArgs(Constructor);
        }
        Resolver.module(module).factory(name, Factory);
    };
};
