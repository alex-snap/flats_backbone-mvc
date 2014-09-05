using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Core.Models;
using Core.Services;

namespace flats.Controllers
{
    public class FlatsController : Controller
    {
        private readonly IFlatService _flatService;

        public FlatsController(IFlatService flatService)
        {
            _flatService = flatService;
        }

        [HttpPost]
        public JsonResult Index(int? id, AddFlatModel model)
        {
            _flatService.Add(model);
            return Json(new { Success = true });
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        
    }
}
