using basicTwitter.Model;
using System.Collections.Generic;

namespace basicTwitter.Data.Repositories
{
	public interface ITweetRepository
	{
		List<Tweet> GetAllTweets();
		Tweet GetTweet(int tweedId);
		List<TweetDisplay> GetUserTweets(int userId);
		int AddTweet(Tweet twt);

	}
}
