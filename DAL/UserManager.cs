using DAL.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace DAL
{
    public class FlatsUserManager: UserManager<User>
    {
        public FlatsUserManager(IUserStore<User> store): base(store)
        {
            
        }

        public static FlatsUserManager Create(
            IdentityFactoryOptions<FlatsUserManager> options,
            IOwinContext context)
        {
            FlatsIdentityDbContext db = context.Get<FlatsIdentityDbContext>();
            FlatsUserManager manager = new FlatsUserManager(new UserStore<User>(db));
            return manager; 
        }

    }
}