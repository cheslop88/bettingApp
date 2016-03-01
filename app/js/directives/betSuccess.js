angular.module('bettingApp')
    .directive('betSuccess', function () {  
    return {  
    	templateUrl: 'partials/betSuccess/index.html',
        restrict: 'E',  
        replace: true,
    };  
}); 