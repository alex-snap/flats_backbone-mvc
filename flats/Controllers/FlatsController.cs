using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Helpers;
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
        public JsonResult Add(AddFlatModel model)
        {

            _flatService.Add(model);
            return Json(new { Success = true });
        }

        public JsonResult All(AddFlatModel model)
        {
            switch (Request.HttpMethod)
            {
                case "POST":
                    _flatService.Add(model);
                    return Json(new { Success = true });
                default:
                    return Json(_flatService.GetAll(), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Get(int id)
        {
            return Json(_flatService.Get(id), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Update(int id)
        {
            return Json(_flatService.Get(id), JsonRequestBehavior.AllowGet);
        }
    }
}
