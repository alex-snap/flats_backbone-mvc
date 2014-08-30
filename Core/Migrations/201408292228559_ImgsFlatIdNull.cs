namespace Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ImgsFlatIdNull : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Images", "FlatID", "dbo.Flats");
            DropIndex("dbo.Images", new[] { "FlatID" });
            AlterColumn("dbo.Images", "FlatID", c => c.Int());
            CreateIndex("dbo.Images", "FlatID");
            AddForeignKey("dbo.Images", "FlatID", "dbo.Flats", "ID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Images", "FlatID", "dbo.Flats");
            DropIndex("dbo.Images", new[] { "FlatID" });
            AlterColumn("dbo.Images", "FlatID", c => c.Int(nullable: false));
            CreateIndex("dbo.Images", "FlatID");
            AddForeignKey("dbo.Images", "FlatID", "dbo.Flats", "ID", cascadeDelete: true);
        }
    }
}
