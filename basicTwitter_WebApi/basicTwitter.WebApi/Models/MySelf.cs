using basicTwitter.Data.Repositories;
using basicTwitter.Model;
using System.Collections.Generic;

namespace basicTwitter.WebApi.Models
{
	public class MySelf
	{
		public User Self { get; set; }

		public List<Follow> Follow { get; set; }

		public List<Follow> FollowedBy { get; set; }

		public List<TweetDisplay> PersonalTweets { get; set; }
	}
}