using System;
using System.IO;
using DAL;
using DAL.Entities;

namespace Core.Services.Implementations
{
    public class FileService: IFileService
    {
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
                string filePath = Path.Combine("Storage/imgs/", image.ID + fileExtension);
                using (var stream = new MemoryStream())
                {
                    imageStream.CopyTo(stream);
                    File.WriteAllBytes(filePath, stream.ToArray());
                }
                image.Path = filePath;
                db.SaveChanges();
                return image.ID;
            }
        }
    }
}