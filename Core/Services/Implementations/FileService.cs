using System;
using System.IO;
using System.Web;
using DAL;
using DAL.Entities;

namespace Core.Services.Implementations
{
    public class FileService: IFileService
    {
        private readonly HttpContext _httpContext;

        public FileService(HttpContext httpContext)
        {
            _httpContext = httpContext;
        }

        public int SaveImage(Stream imageStream, string fileName)
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
                string fileExtension = Path.GetExtension(fileName);
                string filePath = Path.Combine("Storage/imgs/", image.ID + "." + fileExtension);
                using (var stream = new MemoryStream())
                {
                    imageStream.CopyTo(stream);
                    File.WriteAllBytes(Path.Combine(_httpContext.Server.MapPath("~"),filePath), 
                        stream.ToArray());
                }
                image.Path = filePath;
                db.SaveChanges();
                return image.ID;
            }
        }
    }
}