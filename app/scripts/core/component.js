import Resolver, { Dependency } from './resolver';

const toDerivedComponent = (base, name) => class BaseComponent extends base {
    constructor() {
        super(...arguments);
        const modify = (prop, value) => {
            if (this[prop] === null) {
                delete this[prop];
            } else if (!this[prop]) {
                this[prop] = value;
            }
        };
        modify('templateUrl', name + '.html');
        modify('controller', name + 'Controller');
        modify('controllerAs', 'vm');
    }
};

const Component = (name, module = 'main.components') => {
    if (!name) {throw Error('Can\'t register unnamed component');}

    return (Ctor) => {
        name = name.trim();
        Ctor = toDerivedComponent(Ctor, name);
        Resolver.resolve(Dependency.component, name, module, () => new Ctor());
    };
};

export default Component;
