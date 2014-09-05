using System;

namespace DAL.Entities
{
    public class Entity
    {
        public int ID { get; set; }
        public DateTime Created { get; set; }
        public bool Deleted { get; set; }
    }
}
