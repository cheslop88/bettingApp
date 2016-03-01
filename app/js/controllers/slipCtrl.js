angular.module('bettingApp')
    .controller('slipCtrl', function($scope, getBets, $routeParams, $http) {
    //Retrive the data created in basketCtrl to display any placed bets
       $scope.slips = receipt;
});