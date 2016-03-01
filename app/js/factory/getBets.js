angular.module('bettingApp')
  .factory('getBets', function($http, $q) {
  //Retrieve the data via a factory
  return $http.get('https://bedefetechtest.herokuapp.com/v1/markets').then(function(resp) {
  //Return the response
  return resp.data;
  });
});