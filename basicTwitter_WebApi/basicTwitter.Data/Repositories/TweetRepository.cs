using basicTwitter.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace basicTwitter.Data.Repositories
{
	public class TweetRepository : ITweetRepository
	{
		public int AddTweet(Tweet twt)
		{
			using (var ctx = new TwitterEntities())
			{
				ctx.Tweets.Add(twt);
				ctx.SaveChanges();
				return twt.Id;
			}
		}

		public List<Tweet> GetAllTweets()
		{
			throw new NotImplementedException();
		}

		public Tweet GetTweet(int tweedId)
		{
			throw new NotImplementedException();
		}

		public List<TweetDisplay> GetUserTweets(int userId)
		{
			using (var ctx = new TwitterEntities())
			{
				var results = ctx.Tweets.Join(ctx.Users, t => t.UserId, u => u.UserId, (t, u) => new TweetDisplay()
				{
					UserId = t.UserId,
					UserName = u.UserName,
					Message = t.Message,
					CreatedAt = t.CreatedAt

				})
				.Where(a => a.UserId == userId).OrderByDescending(x => x.CreatedAt).ToList();

				return results;

			}
		}


	}
}