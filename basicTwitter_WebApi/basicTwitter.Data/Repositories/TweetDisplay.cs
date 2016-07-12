using System;

namespace basicTwitter.Data.Repositories
{
	public class TweetDisplay
	{
		public int UserId { get; set; }
		public string UserName { get; set; }
		public string Message { get; set; }
		public DateTime? CreatedAt { get; set; }
	}
}