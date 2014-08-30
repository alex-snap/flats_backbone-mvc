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
        public int Sleeper { get; set; }

        public string ImageList { get; set; }
    }
}