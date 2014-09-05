using System.IO;
using System.Web;
using System.Web.Mvc;
using Core.Services;

namespace flats.Controllers
{
    public class FilesController : Controller
    {
        private IFileService _fileService;

        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        public JsonResult Image(HttpPostedFileBase uploaderHelper)
        {
            var df = Path.Combine(Server.MapPath("~"), "Storage\\imgs\\");
            return Json(_fileService.SaveImage(uploaderHelper.InputStream, uploaderHelper.FileName));
        }
    }
}
