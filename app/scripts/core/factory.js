import Resolver, { Dependency, toFactory } from './resolver';

const Factory = (name, module = 'main.factories') => {
    if (!name) {throw Error('Can\'t register unnamed factory');}

    return (ctor) => {
        ctor = toFactory(ctor);
        Resolver.resolve(Dependency.factory, name.trim(), module, () => ctor);
    };
};

export default Factory;
