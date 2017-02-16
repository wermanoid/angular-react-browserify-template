import Resolver, { Dependency, getArgs } from './resolver';

const Filter = (name, module = 'main.filters') => {
    if (!name) {throw Error('Can\'t register unnamed filter');}
    return (Ctor) => {
        const factory = (...arg) => {
            const filterObj = new Ctor(...arg);
            return filterObj.filter.bind(filterObj);
        };
        factory.$inject = Ctor.$inject || getArgs(Ctor);
        Resolver.resolve(Dependency.filter, name.trim(), module, () => factory);
    };
};

export default Filter;
