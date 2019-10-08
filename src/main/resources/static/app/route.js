angular.module('myApp').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/page-not-found');
    // parent view - navigation state

    $stateProvider.state('nav', {
        abstract: true,
        url: '',
        views: {
            'nav@': {
                templateUrl: 'app/views/nav.html',
                controller: 'NavController'
            }
        }
    }).state('home', {
        parent: 'nav',
        url: '/',
        views: {
            'content@': {
                templateUrl: 'app/views/home.html',
                controller: 'HomeController'
            }
        }
    }).state('page-not-found', {
        parent: 'nav',
        url: '/page-not-found',
        views: {
            'content@': {
                templateUrl: 'app/views/page-not-found.html',
                controller: 'PageNotFoundController'
            }
        }
    }).state('ticket', {
        parent: 'nav',
        url: '/ticket',
        views: {
            'content@': {
                templateUrl: 'app/views/ticket.html',
                controller: 'TicketController',
            }
        }
    });
});
