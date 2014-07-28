using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DB.Entities
{
    public class FlatBusyDate: Entity
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }

        public virtual Flat Flat { get; set; }
    }
}
