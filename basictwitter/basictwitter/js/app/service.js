(function () {
	var app = angular.module('basictwitter')

		.service('webapi', function ($http, $cacheFactory)
		{
			//TODO: Need to have a fully qualified Uri for web api controller here.
			var serviceBase = '/webapi/twitter/';

			var methods = {};

			methods.GetMySelf = function (userName)
			{
				return $http.get(serviceBase + 'user/myself/' + { params: { userName: userName } });
			}

			methods.AddUser = function (userName)
			{
				return $http.post(serviceBase + 'user/adduser/' + { params: { userName: userName } });
			}

			methods.GetUser = function (userid)
			{
				return $http.get(serviceBase + 'user/' + { params: { id: userid } });
			}

			methods.GetUserByName = function (userName)
			{
				return $http.get(serviceBase + 'user/name/' + { params: { userName: userName } });
			}

			methods.GetUserByName = function (userName)
			{
				return $http.get(serviceBase + 'user/name/' + { params: { userName: userName } });
			}

			methods.GetUserTweets = function (userId)
			{
				return $http.get(serviceBase + 'tweet/usertweets/' + { params: { userId: userId } });
			}

			methods.AddTweet = function (tweet)
			{
				return $http.post(serviceBase + 'user/adduser/' + { params: { tweet: tweet } });
			}

			methods.GetFollowers = function (userId)
			{
				return $http.get(serviceBase + 'follow/followers/' + { params: { userId: userId } });
			}

			methods.GetFollowedBy = function (userId)
			{
				return $http.get(serviceBase + 'follow/followedby/' + { params: { userId: userId } });
			}

			methods.AddFollower = function (follower)
			{
				return $http.get(serviceBase + 'follow/addfollower/' + { params: { follower: follower } });
			}

			return methods;

		})

		.service('userSession', function () {
			var userSession = {};
			userSession.initComplete = false;
			userSession.setUser = function (userId) {
				localStorage.setItem("currentLoggedInUser", userId);
			};
			userSession.exit = function () {
				localStorage.removeItem("currentLoggedInUser");
			};
			userSession.getUser = function () {
				return localStorage.getItem("currentLoggedInUser");
			};
			return userSession;
		})

		.service('loginService', function ($rootScope, $timeout, userSession, selectedData, webapi)
		{
			var methods = {};
			methods.init = function (callback)
			{        		
				var loginObj = {};

				loginObj.userSearch = function (callback)
				{        			
					var myself = webapi.GetMySelf(selectedData.userName);

					if (!angular.isUndefined(myself))
					{
						selectedData.setMySelf(myself);
						callback(myself);
					}
				}

				loginObj.userSearch(callback);

			}
			return methods;
		})

		.service('tweetService', function ($rootScope, $timeout, userSession, selectedData, webapi)
		{
			var methods = {};
			methods.addTweet = function (msg)
			{

				var mySelf = selectedData.getMySelf();

				var tweet = { "userId": mySelf.id, "userName": mySelf.userName, "message": msg, "createdAt": new Date() };				

				selectedData.addToGlobalTweets(tweet);
				if(!selectedData.getPersonalTweets === undefined)
					selectedData.addToPersonalTweets(tweet);
			}


			methods.globalTweet = function (relatedVariable, step)
			{
				//TODO: http service to get this data.
				// I dont' have this implemented. I want to show something on the page
				// regardless of web api configuration. 
				var globalTweets = {
					"tweets": [
						{ "userId": "1", "userName": "thundraking", "message": "some message", "createdAt": "2016-07-09T17:28:25" },
						{ "userId": "2", "userName": "bhunakin", "message": "some message", "createdAt": "2016-07-09T16:28:25" },
						{ "userId": "3", "userName": "ahundra", "message": "some message", "createdAt": "2016-07-09T19:28:25" }
					]
				};
				selectedData.setGlobalTweets(globalTweets);
				return globalTweets;

			}
			methods.personalTweet = function (relatedVariable, person, step)
			{
				var personalTweets = webapi.GetUserTweets(selectedData.getMySelf().userId);				
				selectedData.setPersonalTweets(personalTweets);
				return personalTweets;
			}

			methods.user = function (relatedVariable, step)
			{
				if (step == 'initialize')
				{
					$rootScope.RequestParam[relatedVariable] = {
						size: $rootScope.defaultSize,
						from: 0
					};
				}
				var searchQuery = {
					query: { match_all: {} },
					size: $rootScope.RequestParam[relatedVariable].size,
					from: $rootScope.RequestParam[relatedVariable].from,
					sort: {
						"createdAt": "desc"
					}
				};
				if (step == 'initialize')
				{
					appbaseService.getBundleData(relatedVariable, 'users', searchQuery);
				}
				else if (step == 'scroll')
				{
					appbaseService.search('users', searchQuery).on('data', function (data)
					{
						$timeout(function ()
						{
							$rootScope[relatedVariable].hits.hits = $rootScope[relatedVariable].hits.hits.concat(data.hits.hits)
						});
					});
				}
			}
			methods.followFunction = function (userId, follow)
			{
				$rootScope.personalInfoSingle = $rootScope.personalInfo.hits.hits[0];
				if (follow)
				{
					$rootScope.personalInfoSingle._source.followers.push($rootScope.myself._source.name);
					$rootScope.myself._source.following.push(userId);
				} else
				{
					$rootScope.personalInfoSingle._source.followers.remove($rootScope.myself._source.name);
					$rootScope.myself._source.following.remove(userId);
				}
				appbaseService.update('users', $rootScope.personalInfoSingle._source, $rootScope.personalInfoSingle._id);
				appbaseService.update('users', $rootScope.myself._source, $rootScope.myself._id);
			}
			return methods;
		})

		.service('selectedData', function ()
		 {
			 var factory = {};

			 factory.mySelf = {};
			 factory.globalTweets = [];
			 factory.personalTweets = [];

			 factory.userName = {}

			 factory.setMySelf = function(self) {
				 this.mySelf = self;
			 }

			 factory.getMySelf = function() {
				 if (!this.mySelf) {
					 return null;
				 }
				 return this.mySelf;

			 }

			 factory.setGlobalTweets =  function(tweets){
				 this.globalTweets = tweets;
			 }

			 factory.getGlobalTweets = function () {
				 if (!this.globalTweets) {
					 return null;
				 }
				 return this.globalTweets;
			 }

			 factory.addToGlobalTweets = function (tweet) {
				 this.globalTweets.tweets.push(tweet);
			 }

			 factory.setPersonalTweets = function(tweets)
			 {
				 this.personalTweets = tweets;
			 }

			 factory.getPersonalTweets = function () {
				 if (!this.personalTweets) {
					 return null;
				 }			 
				 return this.personalTweets;
			 }

			 factory.addToPersonalTweets = function (tweet) {
				 this.personalTweets.tweets.push(tweet);
			 }

			 return factory;
		 
		})

})();