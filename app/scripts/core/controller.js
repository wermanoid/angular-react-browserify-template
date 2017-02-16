import Resolver, { Dependency } from './resolver';

const Controller = (name, module = 'main.controllers') => {
    if (!name) {
        throw Error('Can\'t register unnamed controller');
    }

    return (ctor) => {
        name = name.trim() + 'Controller';
        Resolver.resolve(Dependency.controller, name, module, () => ctor);
    };
};

export default Controller;
