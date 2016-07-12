using basicTwitter.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace basicTwitter.Data.Repositories
{
	public class FollowRepository : IFollowRepository
	{
		public void AddFollower(Follow follower)
		{
			using (var ctx = new TwitterEntities())
			{
				ctx.Follows.Add(follower);

			}
		}

		public List<Follow> GetAllUsers()
		{
			throw new NotImplementedException();
		}

		public List<Follow> GetFollowedBy(int followUser)
		{
			using (var ctx = new TwitterEntities())
			{
				return ctx.Follows.Where(x => x.FollowUser == followUser).ToList();
			}
		}

		public List<Follow> GetFollowing(int userId)
		{
			using (var ctx = new TwitterEntities())
			{
				return ctx.Follows.Where(x => x.UserId == userId).ToList();
			}
		}
	}
}