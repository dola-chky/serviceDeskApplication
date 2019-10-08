angular.module('myApp')
    .controller('NavController', function ($http, $scope, AuthService, $state, $rootScope) {

        $scope.logout = function () {
            AuthService.user = null;
            $rootScope.$broadcast('LogoutSuccessful');
            $state.go('login');
        };
    });
