using System.Data.Entity;
using DAL.Entities;

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
        //public DbSet<User> Users { get; set; }
    }
}
