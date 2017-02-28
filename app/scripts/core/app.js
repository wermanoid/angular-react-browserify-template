/* eslint angular/log: 0 */
import _ 			from 'lodash';
import { Modules } 	from './moduler';
import { Resolver } from './register';

export default ({name, modules}) => {
    return (AppConstructor) => {
        console.log(modules, name, AppConstructor, Modules);

        const app = new AppConstructor();
        const main = Resolver.bootstrap(name, modules);
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
    };
};
