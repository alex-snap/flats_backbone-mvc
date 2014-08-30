using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core.DB;
using Core.DB.Entities;
using Core.Migrations;
using flats.Models;

namespace flats.Controllers
{
    public class FlatsController : Controller
    {
        //
        // GET: /Flats/

        public ActionResult Add(AddFlatModel model)
        {
            return View();
        }

        public ActionResult Imgs(HttpPostedFileBase img)
        {
            using (var db = new EFDbContext())
            {
                Image image = new Image()
                {
                    Created = DateTime.Now,
                    Deleted = false,
                };
                db.Images.Add(image);
                db.SaveChanges();
                string fileExtension = Path.GetExtension(img.FileName);
                string filePath = Path.Combine(Server.MapPath("Storage/imgs/"), image.ID + fileExtension);
                using (var stream = (MemoryStream)img.InputStream)
                    System.IO.File.WriteAllBytes(filePath, stream.ToArray());
                image.Path = filePath;
                db.SaveChanges();
                return Content(image.ID.ToString());
            }
        }

    }
}
