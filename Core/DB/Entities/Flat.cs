using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DB.Entities
{
    public class Flat: Entity
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Roooms { get; set; }
        public string MainImg { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<FlatBusyDate> FlatBusyDates { get; set; }
    }
}
