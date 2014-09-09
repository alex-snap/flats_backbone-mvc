using System.Collections.Generic;

namespace Core.Models
{
    public class FlatPreviewModel
    {
        public int ID { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Rooms { get; set; }
        public int Sleeper { get; set; }
        public string ImageLink { get; set; }
    }
}