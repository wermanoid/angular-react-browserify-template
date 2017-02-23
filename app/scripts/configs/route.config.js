import states from './states.config';

export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
    'ngInject';
    const {appStates} = states;
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');

    appStates.forEach($stateProvider.state);

    $urlRouterProvider.otherwise('/home');
};
