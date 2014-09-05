using System.Web.Mvc;
using System.Web.Routing;

namespace flats
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Flats",
                url: "flats",
                defaults: new { controller = "Flats", action = "All", httpMethod = new HttpMethodConstraint("GET") }
            );

            routes.MapRoute(
                name: "FlatAdd",
                url: "flats",
                defaults: new { controller = "Flats", action = "Add", httpMethod = new HttpMethodConstraint("POST") }
            );

            routes.MapRoute(
                name: "Flat",
                url: "flats/{id}",
                defaults: new { controller = "Flats", action = "Get", 
                    httpMethod = new HttpMethodConstraint("GET") }
            );
            routes.MapRoute(
                name: "UpdateFlat",
                url: "flats/{id}",
                defaults: new { controller = "Flats", action = "Update", 
                    httpMethod = new HttpMethodConstraint("PUT") }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}