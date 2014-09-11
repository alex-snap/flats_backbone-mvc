namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUser : DbMigration
    {
        public override void Up()
        {
            //CreateTable(
            //    "dbo.Users",
            //    c => new
            //        {
            //            Id = c.String(nullable: false, maxLength: 128),
            //            Email = c.String(),
            //            EmailConfirmed = c.Boolean(nullable: false),
            //            PasswordHash = c.String(),
            //            SecurityStamp = c.String(),
            //            PhoneNumber = c.String(),
            //            PhoneNumberConfirmed = c.Boolean(nullable: false),
            //            TwoFactorEnabled = c.Boolean(nullable: false),
            //            LockoutEndDateUtc = c.DateTime(),
            //            LockoutEnabled = c.Boolean(nullable: false),
            //            AccessFailedCount = c.Int(nullable: false),
            //            UserName = c.String(),
            //        })
            //    .PrimaryKey(t => t.Id);
            
            //CreateTable(
            //    "dbo.IdentityUserClaims",
            //    c => new
            //        {
            //            Id = c.Int(nullable: false, identity: true),
            //            UserId = c.String(maxLength: 128),
            //            ClaimType = c.String(),
            //            ClaimValue = c.String(),
            //        })
            //    .PrimaryKey(t => t.Id)
            //    .ForeignKey("dbo.Users", t => t.UserId)
            //    .Index(t => t.UserId);
            
            //CreateTable(
            //    "dbo.IdentityUserLogins",
            //    c => new
            //        {
            //            UserId = c.String(nullable: false, maxLength: 128),
            //            LoginProvider = c.String(),
            //            ProviderKey = c.String(),
            //            User_Id = c.String(maxLength: 128),
            //        })
            //    .PrimaryKey(t => t.UserId)
            //    .ForeignKey("dbo.Users", t => t.User_Id)
            //    .Index(t => t.User_Id);
            
            //CreateTable(
            //    "dbo.IdentityUserRoles",
            //    c => new
            //        {
            //            RoleId = c.String(nullable: false, maxLength: 128),
            //            UserId = c.String(nullable: false, maxLength: 128),
            //            IdentityRole_Id = c.String(maxLength: 128),
            //        })
            //    .PrimaryKey(t => new { t.RoleId, t.UserId })
            //    .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
            //    .ForeignKey("dbo.IdentityRoles", t => t.IdentityRole_Id)
            //    .Index(t => t.UserId)
            //    .Index(t => t.IdentityRole_Id);
            
            //CreateTable(
            //    "dbo.IdentityRoles",
            //    c => new
            //        {
            //            Id = c.String(nullable: false, maxLength: 128),
            //            Name = c.String(),
            //        })
            //    .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            //DropForeignKey("dbo.IdentityUserRoles", "IdentityRole_Id", "dbo.IdentityRoles");
            //DropForeignKey("dbo.IdentityUserRoles", "UserId", "dbo.Users");
            //DropForeignKey("dbo.IdentityUserLogins", "User_Id", "dbo.Users");
            //DropForeignKey("dbo.IdentityUserClaims", "UserId", "dbo.Users");
            //DropIndex("dbo.IdentityUserRoles", new[] { "IdentityRole_Id" });
            //DropIndex("dbo.IdentityUserRoles", new[] { "UserId" });
            //DropIndex("dbo.IdentityUserLogins", new[] { "User_Id" });
            //DropIndex("dbo.IdentityUserClaims", new[] { "UserId" });
            //DropTable("dbo.IdentityRoles");
            //DropTable("dbo.IdentityUserRoles");
            //DropTable("dbo.IdentityUserLogins");
            //DropTable("dbo.IdentityUserClaims");
            //DropTable("dbo.Users");
        }
    }
}
