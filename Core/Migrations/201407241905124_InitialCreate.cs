namespace Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FlatBusyDates",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        DateFrom = c.DateTime(nullable: false),
                        DateTo = c.DateTime(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                        Flat_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Flats", t => t.Flat_ID)
                .Index(t => t.Flat_ID);
            
            CreateTable(
                "dbo.Flats",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Roooms = c.Int(nullable: false),
                        MainImg = c.String(),
                        Address = c.String(),
                        Created = c.DateTime(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FlatID = c.Int(nullable: false),
                        Path = c.String(),
                        Created = c.DateTime(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Flats", t => t.FlatID, cascadeDelete: true)
                .Index(t => t.FlatID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Images", "FlatID", "dbo.Flats");
            DropForeignKey("dbo.FlatBusyDates", "Flat_ID", "dbo.Flats");
            DropIndex("dbo.Images", new[] { "FlatID" });
            DropIndex("dbo.FlatBusyDates", new[] { "Flat_ID" });
            DropTable("dbo.Images");
            DropTable("dbo.Flats");
            DropTable("dbo.FlatBusyDates");
        }
    }
}
