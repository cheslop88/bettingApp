describe('basketCtrl', function() {
    var scope, httpBackend, createController;

    beforeEach(inject(function($scope, getBets, $routeParams, $http) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('basketCtrl', {
                '$scope': scope
            });
        };
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should run the Test to get the link data from the go backend', function() {
        var controller = createController();
        scope.urlToScrape = 'success.com';

        httpBackend.expect('GET', 'https://bedefetechtest.herokuapp.com/v1/markets')
            .respond({
                "success": true
            });

        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        scope.$apply(function() {
            scope.runTest();
        });

        expect(scope.parseOriginalUrlStatus).toEqual('calling');

        httpBackend.flush();

        expect(scope.parseOriginalUrlStatus).toEqual('waiting');
        expect(scope.doneScrapingOriginalUrl).toEqual(true);
    });
});