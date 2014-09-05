namespace Core.Models
{
    public class AddFlatModel
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Rooms { get; set; }
        public int Sleeper { get; set; }

        public string ImagesList { get; set; }
    }
}