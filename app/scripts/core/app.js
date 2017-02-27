/* eslint angular/log: 0 */
import _ 			from 'lodash';
import Resolver 	from './resolver';
import { Modules } 	from './moduler';

const App = ({name, modules}) => {
    return (Ctor) => {

        const app = new Ctor();

        Resolver.bootstrap(name, modules, (main) => {
            const { configs } = Modules;
            _(configs)
                .keys()
                .map(key => configs[key].default)
                .forEach(conf => {
                    if (_.isFunction(conf) || (_.isArray(conf) && _.flow(_.last, _.isFunction)(conf))) {
                        main.config.call(main, conf);
                    } else {
                        _(conf).keys()
                            .reduce((module, key) => {
                                return module.value(key, conf[key]);
                            }, main);
                    }
                });
            if (app.run) {
                main.run.call(main, app.run);
            }
        });
    };
};

export default App;
