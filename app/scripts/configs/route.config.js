export default ($routeProvider) => {
    'ngInject';
    $routeProvider
        .when('/main', {templateUrl: 'main.html', controller: 'mainController', controllerAs: 'vm'})
        .otherwise('/main');
};
