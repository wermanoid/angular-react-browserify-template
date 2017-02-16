import Resolver, { Dependency } from './resolver';

const Service = (name, module = 'main.services') => {
    if (!name) {throw Error('Can\'t register unnamed service');}

    return (ctor) => {
        Resolver.resolve(Dependency.service, name.trim(), module, () => ctor);
    };
};

export default Service;
