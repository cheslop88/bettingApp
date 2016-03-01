angular.module('bettingApp')
    .config(['$routeProvider', function($routeProvider) {
	$routeProvider
	/* Main bet page */
	.when('/bets', {
	    templateUrl: 'partials/bets/index.html',
	    controller: 'basketCtrl'
	})
	/* Individual bet page to enter stage and submit bet */
	.when('/basket/:bet_id', {
	   templateUrl: 'partials/basket/index.html',
	   controller: 'basketCtrl'
	})
	/* Page to view placed bet receipt */
	.when('/slip', {
	   templateUrl: 'partials/slip/index.html',
	   controller: 'slipCtrl'
	})
	/* Anything else return home to main bet page */
	.otherwise({redirectTo: '/bets'});
}]);