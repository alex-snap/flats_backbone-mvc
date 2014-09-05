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
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Flat",
                url: "flats/{id}",
                defaults: new { controller = "Flats", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Video",
                url: "Test/Video",
                defaults: new { controller = "Test", action = "Video" }
            );
        }
    }
}