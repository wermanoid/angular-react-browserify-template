import ngTemplates      from 'gulp-ng-templates';
import {Args as args}   from './args';
import {app}            from './path';
import _                from 'lodash';
import nodePath         from 'path';

function compile_html(){
    return this
        .src(`${app.js}/**/*.html`)
        .pipe(ngTemplates({
                filename: 'templates.js',
                module: 'main.templates',
                path: function (path, base) {
                    return _(path).split(nodePath.sep).last();
                },
                header: `
                    /*eslint max-len: 0*/
                    var angular = require("angular");
                    angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", ($templateCache) => {`
            }))
        .pipe(this.dest(app.js));
}

export { compile_html as HtmlCompile };
