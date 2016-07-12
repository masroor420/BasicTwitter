using basicTwitter.Data.Repositories;
using basicTwitter.Model;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace basicTwitter.WebApi.Controllers
{
	[RoutePrefix("api/twitter/")]
	public class TwitterController : ApiController
	{
		#region Member Variables
		private IUserRepository _userRepository = null;
		private ITweetRepository _tweetRepository = null;
		private IFollowRepository _followRepository = null;
		#endregion 	 Member Variables


		[HttpGet]
		[Route("user/allusers")]
		public IEnumerable<User> GetAllUsers()
		{
			var result = UserRepository.GetAllUsers();
			return result;

		}

		[HttpGet]
		[Route("user/myself/")]
		public basicTwitter.WebApi.Models.MySelf GetMySelf(string userName)
		{
			basicTwitter.WebApi.Models.MySelf mySelf = new Models.MySelf();
			mySelf.Self = UserRepository.GetUserByName(userName);
			mySelf.Follow = FollowRepository.GetFollowing(mySelf.Self.UserId);
			mySelf.FollowedBy = FollowRepository.GetFollowedBy(mySelf.Self.UserId);
			mySelf.PersonalTweets = TweetRepository.GetUserTweets(mySelf.Self.UserId);
			return mySelf;
		}

		[HttpGet]
		[Route("user/{id:int}")]
		public IHttpActionResult GetUser(int id)
		{
			var user = UserRepository.GetUser(id);

			if (user == null)
				return NotFound();
			return Ok(user);
		}
		[HttpPost]
		[Route("user/adduser/{userName}")]
		public int AddUser(string userName)
		{
			return UserRepository.AddUser(new User() { UserName = userName });
		}
		[HttpGet]
		[Route("user/name/{userName}")]
		public User GetUserByName(string userName)
		{
			return UserRepository.GetUserByName(userName);
		}
		[HttpGet]
		[Route("tweet/usertweets/{userId:int}")]
		public IEnumerable<TweetDisplay> GetUserTweets(int userId)
		{
			return TweetRepository.GetUserTweets(userId);
		}
		[HttpPost]
		[Route("tweet/addtweet/")]
		public int AddTweet([FromBody] Tweet tweet)
		{
			return TweetRepository.AddTweet(tweet);
		}

		[HttpGet]
		[Route("follow/followers/")]
		public IHttpActionResult GetFollowing(int userId)
		{
			var follower = FollowRepository.GetFollowing(userId);
			if (follower.Count == 0)
				return NotFound();
			return Ok(follower);
		}


		[HttpGet]
		[Route("follow/followedby/")]
		public IHttpActionResult GetFollowedBy(int userId)
		{
			var follower = FollowRepository.GetFollowedBy(userId);
			if (follower.Count == 0)
				return NotFound();
			return Ok(follower);
		}

		[HttpPost]
		[Route("follow/addfollower/")]
		public HttpResponseMessage AddFollower([FromBody] Follow follower)
		{
			FollowRepository.AddFollower(follower);
			return Request.CreateResponse(HttpStatusCode.OK);
		}

		public IUserRepository UserRepository
		{
			get
			{
				if (_userRepository == null)
				{
					_userRepository = new UserRepository();
				}
				return _userRepository;
			}
		}

		private ITweetRepository TweetRepository
		{
			get
			{
				if (_tweetRepository == null)
				{
					_tweetRepository = new TweetRepository();
				}
				return _tweetRepository;
			}
		}



		private IFollowRepository FollowRepository
		{
			get
			{
				if (_followRepository == null)
				{
					_followRepository = new FollowRepository();
				}
				return _followRepository;
			}
		}
	}
}
