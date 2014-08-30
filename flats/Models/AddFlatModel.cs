using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace flats.Models
{
    public class AddFlatModel
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Rooms { get; set; }
        //public string MainImg { get; set; }

        public List<int> Image { get; set; }
    }
}