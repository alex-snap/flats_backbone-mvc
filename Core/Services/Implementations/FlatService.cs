using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Core.Const;
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
                Mapper.CreateMap(flatModel.GetType(), typeof (Flat)).ForMember("Images", op => op.Ignore());
                var flat = new Flat()
                {
                    Created = DateTime.Now,
                    Deleted = false,
                };
                db.Flats.Add(flat);
                Mapper.Map(flatModel, flat);
                if (flatModel.Images != null)
                {
                    foreach (var imgId in flatModel.Images)
                    {
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

        public IEnumerable<FlatPreviewModel> GetAll(string sortBy, string query)
        {
            var flatsModel = new List<FlatPreviewModel>();
            using (EFDbContext db = new EFDbContext())
            {
                List<Flat> flats;
                if (!string.IsNullOrEmpty(query))
                {
                    query = query.ToLower();
                    flats = db.Flats.Where(f => f.Address.ToLower().Contains(query)
                                        || f.Description.ToLower().Contains(query)).ToList();
                }
                else
                    flats = db.Flats.ToList();
                foreach (var flat in flats)
                {
                    var flatModel = new FlatPreviewModel();
                    Mapper.CreateMap(typeof(Flat), flatModel.GetType());
                    Mapper.Map(flat, flatModel);
                    if (flat.Images != null && flat.Images.Any())
                        flatModel.ImageLink = flat.Images.First().Path;
                    flatsModel.Add(flatModel);
                }
            }
            switch (sortBy)
            {
                case SortBy.MaxRooms:
                    return flatsModel.OrderByDescending(f => f.Rooms);
                case SortBy.MinPrice:
                    return flatsModel.OrderBy(f => f.Price);
                case SortBy.NewDate:
                    return flatsModel.OrderByDescending(f => f.Created);
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