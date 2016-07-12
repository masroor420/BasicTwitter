using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using basicTwitter.Model;

namespace basicTwitter.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        public List<User> GetAllUsers()
        {
            using (var ctx = new TwitterEntities())
            {
                return ctx.Users.ToList();
            }
        }

        public User GetUser(int userId)
        {
            using (var ctx = new TwitterEntities())
            {
                return ctx.Users.Where(x => x.UserId == userId).SingleOrDefault();
            }
        }

        public User GetUserByName(string name)
        {
            using (var ctx = new TwitterEntities())
            {
                return ctx.Users.Where(x => string.Equals(x.UserName, name.ToLower())).FirstOrDefault();
            }
        }

        public int AddUser(User user)
        {
            using (var ctx = new TwitterEntities())
            {
                ctx.Users.Add(user);
                ctx.SaveChanges();
                return user.UserId;
            }
        }
    }
}