using System.Web;
using System.Web.Optimization;

namespace flats
{
    public class BundleConfig
    {

        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/libs").Include(
                        "~/Scripts/lib/jquery/jquery-1.7.1.min.js",
                        "~/Scripts/lib/underscore/underscore.min.js",
                        "~/Scripts/lib/backbone/backbone.min.js"));

            bundles.Add(new ScriptBundle("~/app").Include(
                
                        // main 
                        // ----------
                        "~/Scripts/app/main.js",

                        // models
                        // ----------
                        "~/Scripts/app/models/flats/model_flat.js",

                        // collections
                        // ----------
                        "~/Scripts/app/collections/flats.js",

                        // views
                        // ----------
                        "~/Scripts/app/views/flats/view_flat-list.js",
                        "~/Scripts/app/views/flats/view_flat-item.js",
                        "~/Scripts/app/views/flats/view_flat-edit.js",

                        // router
                        // ----------
                        "~/Scripts/app/router.js"

                        ));

            bundles.Add(new StyleBundle("~/styles").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/custom.css",
                      "~/Content/bootstrap-select.css",
                      "~/Content/bootstrap-select.min.css"));

            BundleTable.EnableOptimizations = true;
        }
    }
}
