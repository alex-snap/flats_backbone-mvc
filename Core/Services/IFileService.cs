using System.IO;

namespace Core.Services
{
    public interface IFileService
    {
        int SaveImage(Stream stream, string fileName);
    }
}