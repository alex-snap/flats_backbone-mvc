using System.Web;
using System.Web.Optimization;
using BundleTransformer.Core.Transformers;

namespace flats
{
    public class BundleConfig
    {

        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var cssTransformer = new StyleTransformer();
            var css = new Bundle("~/styles")
                .Include("~/Content/styles.less");
            css.Transforms.Add(cssTransformer);
            bundles.Add(css);

            bundles.Add(new ScriptBundle("~/libs").Include(
                        "~/Scripts/lib/jquery/jquery-1.7.1.min.js",
                        "~/Scripts/lib/underscore/underscore.min.js",
                        "~/Scripts/lib/backbone/backbone.min.js",
                        "~/Scripts/lib/moment/moment.min.js",
                        "~/Scripts/lib/moment/moment.ru.js"));


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

            //BundleTable.EnableOptimizations = true;
        }
    }
}
