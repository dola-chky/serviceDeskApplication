angular.module('myApp')
    .controller('TicketController', function ($http, $scope, $filter, AuthService) {
        var edit = false;
        $scope.buttonText = 'Create';
        $scope.tickets = [];
        $scope.priorities = [];
        var init = function () {
            $http.get('api/tickets').success(function (res) {
                var tickets = res.tickets;
                var proirities = res.priorities;
                angular.forEach(tickets,function (ticket) {
                    var creationDate = $filter('date')(new Date(ticket.creationDate),'MM/dd/yyyy');
                    ticket.creationDate = creationDate;
                });

                $scope.tickets = tickets;
                $scope.priorities = proirities;
                $scope.ticketForm.$setPristine();
                $scope.message = '';
                $scope.ticket = null;
                $scope.buttonText = 'Create';
                $scope.isNewMode = false;
                $scope.isEditMode = false;

            }).error(function (error) {
                $scope.message = error.message;
            });
        };

        $scope.initEdit = function (ticket) {
            edit = true;
            $scope.isNewMode = true;
            $scope.ticket = ticket;
            var creationDate = new Date(ticket.creationDate);
            $scope.ticket.creationDate = creationDate;
            $scope.message = '';
            $scope.buttonText = 'Update';
        };
        $scope.initAddTicket = function () {
            edit = false;
            $scope.isNewMode = true;
            $scope.ticket = null;
            $scope.ticketForm.$setPristine();
            $scope.message = '';
            $scope.buttonText = 'Create';
        };
        $scope.deleteTicket = function (ticket) {
            $http.delete('api/ticket/' + ticket.id).success(function (res) {
                $scope.deleteMessage = "Success!";
                init();
            }).error(function (error) {
                $scope.deleteMessage = error.message;
            });
        };
        var editTicket = function (ticket) {
            $http.put('api/ticket/'+ ticket.id, ticket).success(function (res) {
                $scope.ticket = null;
                $scope.ticketForm.$setPristine();
                $scope.message = "Editing Success";
                init();
            }).error(function (error) {
                $scope.message = error.message;
            });
        };
        var addTicket = function () {
            $scope.ticket.ticketPriority = $scope.priority;
            $http.post('api/ticket/', $scope.ticket).success(function (res) {
                $scope.ticket = null;
                $scope.ticketForm.$setPristine();
                $scope.message = "Ticket Created";
                init();
            }).error(function (error) {
                $scope.message = error.message;
            });
        };

        $scope.submit = function () {
            if (edit) {
                editTicket($scope.ticket);
            } else {
                addTicket();
            }
        };

        $scope.cancel = function () {
            $scope.isNewMode = false;
        };
        init();

    });
