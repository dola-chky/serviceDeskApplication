angular.module('myApp', ['ui.router','ui.bootstrap'])
    .run(function (AuthService, $rootScope, $state) {
        /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            event.preventDefault();
            $state.go('ticket');
        });*/
    });