using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using basicTwitter.Model;

namespace basicTwitter.Data.Repositories
{
     public interface IUserRepository
    {
        List<User> GetAllUsers();
        User GetUser(int userId);

        User GetUserByName(string name);

        int AddUser(User name);

    }
}
