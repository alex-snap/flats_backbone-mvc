using System.Security.Cryptography.X509Certificates;
using Core.Models;

namespace Core.Services
{
    public interface IFlatService
    {
        void Add(AddFlatModel flat);

        void View();
    }
}