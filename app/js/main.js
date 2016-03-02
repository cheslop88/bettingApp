//self calling function, all directives, controllers and routes housed in other files
(function() {
  'use strict';
  // Declare app level module which depends on views, and components
angular.module('bettingApp', ['ngRoute', 'angular.filter']);
})();

angular.module('bettingApp')
  .factory('getBets', ['$http', '$q', function($http, $q) {
  //Retrieve the data via a factory
  return $http.get('https://bedefetechtest.herokuapp.com/v1/markets').then(function(resp) {
  //Return the response
  return resp.data;
  });
}]);
angular.module('bettingApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
	// use the HTML5 History API
  $locationProvider.html5Mode(true);
}]);
angular.module('bettingApp')
  /* Pass in the dependencies incl. the getBets factory */
  /* Full controller approach is handled in the gulp file via ng-annotate */
  .controller('basketCtrl', ['$scope', 'getBets', '$routeParams', '$http', function($scope, getBets, $routeParams, $http) {
  getBets.then(function(data) {
      //Success
      /* Set variable for use with front end view */
      $scope.dataError = false;
      /* Pass the response data into a scoped variable for use with views */
      $scope.bets = data;
      /* We want to scope the bet variable to the param/url for each individial bet */
      $scope.bet = $scope.bets[$routeParams.bet_id]
  }, function(response) {
      //Error
      /* Set variable for use with front end view */
      $scope.dataError = true;
  });
  // On click of 'place bet' button, run the following function to post and save bet
    $scope.save = function() {
        // Variable declaration, use the $scope attr to retrieve specific bet information
        var bet_id = $scope.bet.bet_id,
            numerator = $scope.bet.odds.numerator,
            denominator = $scope.bet.odds.denominator,
            /* Stake is not part of initial object, hence we don't need to encase it in the 'bet' scope */
            stake = $scope.stake,
            /* Bet object, which creates the necessary information for the post object */
            betInfo = '{"bet_id":' + bet_id +', "odds":{"numerator":'+ numerator +',"denominator":'+ denominator +'}, "stake":' + stake + '}',
            /* As previous creation was a string, convert it to object valid for the post method */
            jsonObj = JSON.parse(betInfo);
        $http.post("https://bedefetechtest.herokuapp.com/v1/bets", jsonObj).success(function(data, status) {
            /* Set variable for use with front end view */
            $scope.betPlaced = true;
            /* Pass the response data into a scoped variable for use with views */
            $scope.slips = data;
            /* Global variable required to pass through the successful post data into a receipt for the user */
            receipt = $scope.slips;
        }).error(function (data, status) {
            /* Set variable for use with front end view */
            $scope.betPlaced = false;
        }); 
      }; 
  }]);

angular.module('bettingApp')
    .controller('slipCtrl', ['$scope', 'getBets', '$routeParams', '$http', function($scope, getBets, $routeParams, $http) {
    //Retrive the data created in basketCtrl to display any placed bets
       $scope.slips = receipt;
}]);
angular.module('bettingApp')
    .directive('betFailure', function () {  
    return {  
    	templateUrl: 'partials/betFailure/index.html',
        restrict: 'E',  
        replace: true,
    };  
}); 
angular.module('bettingApp')
    .directive('betSuccess', function () {  
    return {  
    	templateUrl: 'partials/betSuccess/index.html',
        restrict: 'E',  
        replace: true,
    };  
}); 
angular.module('bettingApp')
    .directive('carouselContent', function () {  
    return {  
    	templateUrl: 'partials/carousel/index.html',
        restrict: 'E',  
        replace: true,
        link: function (scope, element, attrs) {  
            var options = scope.$eval($(element).attr('data-options'));  
            $(element).owlCarousel(options);  
        }  
    };  
}); 
//fix required for bootstrap nav to hide the nav on link click
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') !== 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});

//application of an active class to clicked navigation menu item
$(document).on("click", ".navbar li a", function () {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});

$(document).ready(function() {
  $("#banner").owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    items : 1, //1 item above 1000px browser width
    itemsDesktop : [1000,1], //1 item between 1000px and 901px
    itemsDesktopSmall : [900,1], // 1 between 900px and 601px
    itemsTablet: [600,1], //1 items between 600 and 0
    itemsMobile : [500, 1]
  });
});
