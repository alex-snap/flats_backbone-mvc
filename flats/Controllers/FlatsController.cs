using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
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

        public JsonResult Add(AddFlatModel model)
        {
            using (var db = new EFDbContext())
            {
                Mapper.CreateMap(typeof(AddFlatModel), typeof(Flat));
                var flat = new Flat();
                db.Flats.Add(flat);
                Mapper.Map(model, flat);
                var imgsIds = model.ImageList.Split(new[] {","}, StringSplitOptions.RemoveEmptyEntries).ToList();
                foreach (var stringImgsId in imgsIds)
                {
                    int imgId = int.Parse(stringImgsId);
                    var img = db.Images.SingleOrDefault(i => i.ID == imgId);
                    if (img != null)
                    {
                        img.Flat = flat;
                    }
                }
                db.SaveChanges();
            }
            return Json("Success");
        }
        
    }
}
