import _ from 'lodash';

class Enumeration {
    constructor(...items) {
        _.forEach(items, (item) => {
            Object.defineProperty(this, item, {
                value: item,
                writable: false
            });
        });
    }
}

export { Enumeration };
