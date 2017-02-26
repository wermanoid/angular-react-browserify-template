export default {
    appStates: [{
        name: 'home',
        title: 'Home',
        url: '/home',
        component: 'home',
        icon: 'fa-home'
    }, {
        name: 'docs',
        title: 'Documentation',
        url: '/docs',
        component: 'documentation',
        icon: 'fa-file-text-o'
    }, {
        name: 'docs.item',
        url: '/{item}',
        component: 'pager',
        resolve: {
            page: ($stateParams) => {
                'ngInject';
                return $stateParams.item;
            }
        }
    }]
};
