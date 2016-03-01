angular.module('bettingApp')
  /* Pass in the dependencies incl. the getBets factory */
  /* Full controller approach is handled in the gulp file via ng-annotate */
  .controller('basketCtrl', function($scope, getBets, $routeParams, $http) {
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
  });
