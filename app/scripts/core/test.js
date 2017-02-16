/* eslint angular/log: 0 */
import 'angular-mocks';
import _ from 'lodash';

const map = new Map();

export const TestClass = (Ctor) => {
    const testConf = map.get(Ctor);
    if (testConf) {
        const inst = new Ctor();
        describe(`Unit: ${_.startCase(Ctor.name)}:`, () => {
            testConf.setup[testConf.setup.length - 1] = _.last(testConf.setup).bind(inst);
            beforeEach(() => {
                angular.mock.module('main');
                angular.mock.inject(testConf.setup);
            });
            _.forEach(testConf.tests, (t) => {
                it(`check if: ${_.lowerCase(t.key)}`, inst::t.test);
            });
        });
        map.delete(Ctor);
    }
};

export const Test = ({constructor}, key, {value}) => {
    const registered = map.has(constructor);
    if (registered) {
        const conf = map.get(constructor);
        conf.tests = (conf.tests || []);
        conf.tests.push({key, test: value});
    } else {
        map.set(constructor, { tests: [{ key, test: value }] });
    }
};

export const SetUp = (target, key, descriptor) => {
    const registered = map.has(target.constructor);
    if (registered) {
        const conf = map.get(target.constructor);
        conf.setup = descriptor.value;
    } else {
        map.set(target.constructor, { setup: descriptor.value });
    }
};
