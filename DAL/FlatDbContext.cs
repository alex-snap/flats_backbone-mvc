using System.Data.Entity;
using DAL.Entities;
using Microsoft.AspNet.Identity.EntityFramework;

namespace DAL
{
    public class EFDbContext: DbContext
    {
        public EFDbContext() : base("EFDbContext")
        {
            
        }

        public DbSet<Flat> Flats { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<FlatBusyDate> FlatBusyDates { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
        }
    }
}
