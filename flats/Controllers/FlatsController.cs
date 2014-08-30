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
        
    }
}
