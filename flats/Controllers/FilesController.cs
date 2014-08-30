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
    public class FilesController : Controller
    {
        //
        // GET: /File/

        [HttpPost]
        public ActionResult Image(HttpPostedFileBase UploaderHelper)
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
                string fileExtension = Path.GetExtension(UploaderHelper.FileName);
                string filePath = Path.Combine(Server.MapPath("~/Storage/imgs/"), image.ID + fileExtension);
                using (var stream = new MemoryStream())
                {
                    UploaderHelper.InputStream.CopyTo(stream);
                    System.IO.File.WriteAllBytes(filePath, stream.ToArray());
                }
                image.Path = filePath;
                db.SaveChanges();
                return Content(image.ID.ToString());
            }
        }
    }
}
