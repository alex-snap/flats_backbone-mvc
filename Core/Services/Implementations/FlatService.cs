using System;
using System.Linq;
using AutoMapper;
using Core.Models;
using DAL;
using DAL.Entities;

namespace Core.Services.Implementations
{
    public class FlatService : IFlatService
    {
        public void Add(AddFlatModel flatModel)
        {
            using (var db = new EFDbContext())
            {
                Mapper.CreateMap(flatModel.GetType(), typeof(Flat));
                var flat = new Flat()
                {
                    Created = DateTime.Now,
                    Deleted = false,
                };
                db.Flats.Add(flat);
                Mapper.Map(flatModel, flat);
                var imgsIds = flatModel.ImagesList.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries).ToList();
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
        }

        public void View()
        {
            throw new System.NotImplementedException();
        }
    }
}