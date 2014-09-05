using System;

namespace DAL.Entities
{
    public class FlatBusyDate: Entity
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }

        public virtual Flat Flat { get; set; }
    }
}
