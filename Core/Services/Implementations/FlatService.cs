using System;
using System.Collections.Generic;
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
                if (flatModel.ImagesList != null)
                {
                    var imgsIds =
                        flatModel.ImagesList.Split(new[] {","}, StringSplitOptions.RemoveEmptyEntries).ToList();
                    foreach (var stringImgsId in imgsIds)
                    {
                        int imgId = int.Parse(stringImgsId);
                        var img = db.Images.SingleOrDefault(i => i.ID == imgId);
                        if (img != null)
                        {
                            img.Flat = flat;
                        }
                    }
                }
                db.SaveChanges();
            }
        }

        public IEnumerable<FlatPreviewModel> GetAll()
        {
            var flatsModel = new List<FlatPreviewModel>();
            using (EFDbContext db = new EFDbContext())
            {
                foreach (var flat in db.Flats.ToList())
                {
                    var flatModel = new FlatPreviewModel();
                    Mapper.CreateMap(typeof(Flat), flatModel.GetType());
                    Mapper.Map(flat, flatModel);
                    if (flat.Images != null && flat.Images.Any())
                        flatModel.ImageLink = flat.Images.First().Path;
                    flatsModel.Add(flatModel);
                }
            }
            return flatsModel;
        }

        public FlatViewModel Get(int id)
        {
            using (EFDbContext db = new EFDbContext())
            {
                var flat = db.Flats.SingleOrDefault(f => f.ID == id);
                if (flat == null)
                    return null;
                var flatModel = new FlatViewModel();
                Mapper.CreateMap(typeof(Flat), flatModel.GetType());
                Mapper.Map(flat, flatModel);
                flatModel.Imgs = new List<ImageData>();
                if (flat.Images != null)
                    flat.Images.Each(
                        f => flatModel.Imgs.Add(
                            new ImageData(){ID = f.ID, Src = f.Path}
                    ));
                return flatModel;
            }
        }

        public string Update(AddFlatModelTemp model)
        {
            using (EFDbContext db = new EFDbContext())
            {
                var flat = db.Flats.SingleOrDefault(f => f.ID == model.ID);
                //if (flat == null)
                //    return "ERROR";
                Mapper.CreateMap(model.GetType(), flat.GetType());
                Mapper.Map(model, flat);
                //TODO здесь он может поменяет id

                foreach (var image in flat.Images)
                {
                    if (model.Imgs.All(i => i != image.ID))
                        db.Images.Remove(image);
                }
                foreach (var imgId in model.Imgs)
                {
                    var img = db.Images.SingleOrDefault(i => i.ID == imgId);
                    if (img != null && !img.FlatID.HasValue)
                    {
                        img.Flat = flat;
                    }
                }
                db.SaveChanges();
            }
            return "";
        }
    }
}