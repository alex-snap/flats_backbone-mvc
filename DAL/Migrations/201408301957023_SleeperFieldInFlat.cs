using System.Data.Entity.Migrations;

namespace DAL.Migrations
{
    public partial class SleeperFieldInFlat : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Flats", "Sleeper", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Flats", "Sleeper");
        }
    }
}
