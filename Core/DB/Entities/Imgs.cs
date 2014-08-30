using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DB.Entities
{
    public class Image: Entity
    {
        public int? FlatID { get; set; }
        public string Path { get; set; }

        public virtual Flat Flat { get; set; }
    }
}
