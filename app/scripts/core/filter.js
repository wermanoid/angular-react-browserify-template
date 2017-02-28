import { Resolver } from './register';
import { getArgs } from './helper';

export default ({name, module = 'main.filters'}) => {
    if (!name) {throw Error('Can\'t register unnamed filter');}

    return (Factory) => {
        function factory(...args) {
            const filterObj = new Factory(...args);
            return filterObj.filter.bind(filterObj);
        }

        factory.$inject = getArgs(Factory);
        Resolver.module(module).fiter(name, factory);
    };
};
