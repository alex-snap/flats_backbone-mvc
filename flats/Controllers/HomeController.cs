using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core.DB;
using Core.DB.Entities;

namespace flats.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            //var files = Directory.GetFiles(Server.MapPath("App_Data/TestImgs"));
            //using (var db = new EFDbContext())
            //{
            //    Flat flat = new Flat()
            //    {
            //        Address = "Address",
            //        Created = DateTime.Now,
            //        Deleted = false,
            //        Description = "Some Descr",
            //        MainImg = "App_Data/TestImgs/1.jpg",
            //        Price = 1233,
            //        Roooms = 2,
            //    };
            //    db.Flats.Add(flat);
            //    flat = new Flat()
            //    {
            //        Address = "Address",
            //        Created = DateTime.Now,
            //        Deleted = false,
            //        Description = "Some Descr",
            //        MainImg = "App_Data/TestImgs/2.jpg",
            //        Price = 1500,
            //        Roooms = 3,
            //    };
            //    db.Flats.Add(flat);
            //    db.SaveChanges();
            //}
            return View("Index");
        }

    }
}
