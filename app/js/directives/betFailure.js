angular.module('bettingApp')
    .directive('betFailure', function () {  
    return {  
    	templateUrl: 'partials/betFailure/index.html',
        restrict: 'E',  
        replace: true,
    };  
}); 