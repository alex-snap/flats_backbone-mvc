using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DB.Entities;

namespace Core.DB
{
    public class EFDbContext: DbContext
    {
        public EFDbContext() : base("EFDbContext")
        {
            
        }

        public DbSet<Flat> Flats { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<FlatBusyDate> FlatBusyDates { get; set; }
    }
}
