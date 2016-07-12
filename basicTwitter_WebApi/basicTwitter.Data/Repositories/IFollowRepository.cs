using basicTwitter.Model;
using System.Collections.Generic;

namespace basicTwitter.Data.Repositories
{
	public interface IFollowRepository
	{
		List<Follow> GetAllUsers();
		List<Follow> GetFollowing(int userId);
		List<Follow> GetFollowedBy(int followUser);
		void AddFollower(Follow follower);
	}
}
