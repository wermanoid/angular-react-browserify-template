import _ from 'lodash';

export const getArgs = (func) => {
	// First match everything inside the function argument parens.
    const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
	// Split the arguments string into an array comma delimited.
    return args
		.split(',')
		.map((arg) => arg.replace(/\/\*.*\*\//, '').trim())// Ensure no inline comments are parsed and trim the whitespace.
		.filter((arg) => arg); // Ensure no undefined values are added.
};

export const toFactory = (constructor) => {
    if (_.isArray(constructor)) {
        const ctor = constructor.pop();
        ctor.$inject = _.clone(constructor);
        constructor = ctor;
    }
    const factory = (...arg) => {
        return new constructor(...arg);
    };
    factory.$inject = constructor.$inject || getArgs(constructor);
    return factory;
};
