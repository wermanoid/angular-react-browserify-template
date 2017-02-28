import { Resolver } from './register';

export default (config) => {
    let { name } = config;
    const {
        bindings,
        controller,
        template,
        templateUrl,
        transclude = false,
        controllerAs = 'vm',
        module = 'main.components'
    } = config;
    if (!name) {throw Error('Can\'t register unnamed component');}
    name = name.trim();

    return (ComponentController) => {
        const component = {
            controllerAs,
            transclude,
            bindings,
            controller: controller ? `${controller}Controller` : ComponentController,
            [template ? 'template' : 'templateUrl']: template || templateUrl || `${name}.html`
        };
        Resolver.module(module).component(name, component);
    };
};
