namespace DAL.Entities
{
    public class Image: Entity
    {
        public int? FlatID { get; set; }
        public string Path { get; set; }

        public virtual Flat Flat { get; set; }
    }
}
