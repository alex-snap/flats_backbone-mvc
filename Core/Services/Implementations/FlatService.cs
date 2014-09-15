using System;
using System.Collections.Generic;
using System.Data.Entity;
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

        public FlatsPaged GetAll(string sortBy, string query, int page, int perPage)
        {
            var flatsModel = new List<FlatPreviewModel>();
            var pagedFlats = new FlatsPaged();
            using (EFDbContext db = new EFDbContext())
            {
                List<Flat> flats;
                pagedFlats.Count = db.Flats.Count();
                perPage = perPage == 0 ? int.MaxValue : perPage;
                int skip = (page - 1)*perPage;
                if (!string.IsNullOrEmpty(query))
                {
                    query = query.ToLower();
                    var q = db.Flats.Where(f => f.Address.ToLower().Contains(query)
                                                || f.Description.ToLower().Contains(query));
                    pagedFlats.Count = q.Count();
                    flats = q.OrderBy(f => f.Created)
                             .Skip(skip)
                             .Take(perPage)
                             .ToList();
                }
                else
                {
                    var q = db.Flats.OrderBy(f => f.Created)
                                    .Skip(skip)
                                    .Take(perPage);
                    System.Diagnostics.Debug.WriteLine(q);
                    flats = q.ToList();
                }
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
                    pagedFlats.Flats = flatsModel.OrderByDescending(f => f.Rooms);
                    break;
                case SortBy.MinPrice:
                    pagedFlats.Flats = flatsModel.OrderBy(f => f.Price);
                    break;
                case SortBy.NewDate:
                    pagedFlats.Flats = flatsModel.OrderByDescending(f => f.Created);
                    break;
            }
            pagedFlats.Flats = flatsModel;
            return pagedFlats;
        }

        public FlatViewModel Get(int id)
        {
            using (EFDbContext db = new EFDbContext())
            {
                var flat = db.Flats.SingleOrDefault(f => f.ID == id);
                if (flat == null)
                    return null;
                var flatModel = new FlatViewModel();
                Mapper.CreateMap(typeof (Flat), flatModel.GetType()).ForMember("Images", op => op.Ignore());
                Mapper.Map(flat, flatModel);
                flatModel.Images = new List<ImageData>();
                if (flat.Images != null)
                    flat.Images.Each(
                        f => flatModel.Images.Add(
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