var app = angular.module('basictwitter');

// **Controller: global**.
app.controller('global', function ($scope, userSession, $location, $rootScope, $timeout, loginService, tweetService, selectedData) {
	"use strict";
	$scope.selectedData = selectedData;
	// Hide *navbar* if no one is logged in
	$rootScope.hideNav();
	$rootScope.feed = 'global';

	// Called when the user enters name or when already logged in.
	$scope.login = function () {
		$scope.loading = true;
		selectedData.userName = $scope.userName;
		userSession.setUser($scope.userName.replace(/ /g, "_"));
		loginService.init($scope.afterLogin)
	}
	$scope.afterLogin = function (self) {
		$timeout(function () {
			userSession.initComplete = true;
			$scope.loading = false;
			$location.path('/home/personal');
		});
	}
	// Checks if a user is already logged in the session.
	if ($scope.userName === userSession.getUser())
		$scope.login();
	
	$scope.globalTweets = tweetService.globalTweet('tweets', 'initialize');
	

})

  // **Controller: home**. 
	.controller('home', function ($scope, userSession, $rootScope, $routeParams, tweetService, selectedData) {
		"use strict";
		
		$scope.selectedData = selectedData;
		
		$rootScope.showNav();
		$rootScope.currentPerson = userSession.getUser();
		
		$rootScope.feed = $routeParams.feed === undefined ? 'global' : $routeParams.feed;
		if ($rootScope.feed == 'personal') {
			tweetService.personalTweet('personalTweets', $rootScope.currentPerson, 'initialize');
		}
	
		$scope.addTweet = function () {
			tweetService.addTweet($scope.msg);
			$scope.msg = '';
		};
	})

	// **Controller: navbar**.
	.controller('navbar', function ($scope, $rootScope) {
		"use strict";
	   
		$scope.gotoProfile = function (userId) {
			alert("Profile display is not implemented");
		};
	})