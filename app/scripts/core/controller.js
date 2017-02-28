import { Resolver } from './register';

export default ({name, module = 'main.controllers'}) => {
    if (!name) {
        throw Error('Can\'t register unnamed controller');
    }

    return (Controller) => {
        Resolver.module(module)
            .controller(`${name.trim()}Controller`, Controller);
    };
};
