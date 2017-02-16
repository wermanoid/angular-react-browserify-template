const bulk = require('bulk-require');

const {'..': mods} = bulk(__dirname, [`../**/!(*index|*.spec|${['dev', 'uat', 'local', 'prod']
    .filter(s => s !== process.env.ENV_CONFIG)
    .map(s => `*${s}.config`)
    .join('|')}|*.main|*test).js`
]);

export {mods as Modules};
