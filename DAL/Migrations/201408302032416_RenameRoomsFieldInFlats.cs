using System.Data.Entity.Migrations;

namespace DAL.Migrations
{
    public partial class RenameRoomsFieldInFlats : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Flats", "Rooms", c => c.Int(nullable: false));
            DropColumn("dbo.Flats", "Roooms");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Flats", "Roooms", c => c.Int(nullable: false));
            DropColumn("dbo.Flats", "Rooms");
        }
    }
}
