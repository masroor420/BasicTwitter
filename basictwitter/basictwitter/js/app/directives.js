var app = angular.module('basictwitter');

app.directive('tweet', function ($rootScope) {    

    return {
        restrict: 'E',
        templateUrl: 'views/tweet.html'
    };
});