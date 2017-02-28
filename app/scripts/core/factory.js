import { Resolver } from './register';
import { getArgs } from './helper';

export default ({name, module = 'main.factories'}) => {
    if (!name) {throw Error('Can\'t register unnamed factory');}

    return (Factory) => {
        function factory(...args) {
            return new Factory(...args);
        }

        factory.$inject = getArgs(Factory);
        Resolver.module(module).factory(name, factory);
    };
};
