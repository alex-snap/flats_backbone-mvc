using System.Collections.Generic;

namespace Core.Models
{
    public class AddFlatModel
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Rooms { get; set; }
        public int Sleeper { get; set; }

        public List<int> Images { get; set; }
    }

    public class AddFlatModelTemp
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Rooms { get; set; }
        public int Sleeper { get; set; }

        public List<int> Imgs { get; set; }
    }

    public class ImageData
    {
        public int ID { get; set; }

        public string Src { get; set; }
    }
}