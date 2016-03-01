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