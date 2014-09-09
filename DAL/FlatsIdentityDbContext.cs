using System.Data.Entity;
using DAL.Entities;
using Microsoft.AspNet.Identity.EntityFramework;

namespace DAL
{
    public class FlatsIdentityDbContext: IdentityDbContext<User>
    {
        public FlatsIdentityDbContext() : base("EFDbContext") { }

        static FlatsIdentityDbContext()
        {
            Database.SetInitializer<FlatsIdentityDbContext>(new IdentityDbInit());
        }

        public static FlatsIdentityDbContext Create()
        {
            return new FlatsIdentityDbContext();
        }
    }

    public class IdentityDbInit : DropCreateDatabaseIfModelChanges<FlatsIdentityDbContext>
    {
        protected override void Seed(FlatsIdentityDbContext context)
        {
            PerformInitialSetup(context);
            base.Seed(context);
        }

        public void PerformInitialSetup(FlatsIdentityDbContext context)
        {
            //
        }
    }
}