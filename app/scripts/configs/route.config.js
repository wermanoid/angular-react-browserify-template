export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
    'ngInject';
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');

    const mainState = {
        name: 'home',
        url: '/home',
        component: 'home'
    };

    $stateProvider.state(mainState);
    $urlRouterProvider.otherwise('/home');
};
