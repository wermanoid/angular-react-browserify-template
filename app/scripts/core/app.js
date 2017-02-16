import _ 			from 'lodash';
import Resolver 	from './resolver';
import { Modules } 	from './moduler';

const App = (name) => {
    return (Ctor) => {
        const app = new Ctor();
        Resolver.bootstrap(name, app.vendors, (main) => {
            const { configs } = Modules;
            _(configs)
                .keys()
                .map(k => configs[k].default)
                .forEach(c => {
                    if (_.isArray(c) || (c.$inject && c.$inject.length > 0)) {
                        main.config.call(main, c);
                    } else {
                        _(c)
                            .keys()
                            .reduce((module, key) => {
                                return module.value(key, c[key]);
                            }, main);
                    }
                });
        });
    };
};

export default App;
