import { Resolver } from './register';

export default ({name, module = 'main.services'}) => {
    if (!name) {throw Error('Can\'t register unnamed service');}

    return (Service) => {
        Resolver.module(module).service(name, Service);
    };
};
