// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BundleConfig.cs" company="">
//   Copyright ?2014 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.Resource
{
    using System.Web;
    using System.Web.Optimization;

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new StyleBundle("~/content/css/app").Include(
                "~/Frameworks/bootstrap/css/bootstrap.min.css",
                "~/Frameworks/angularTree/angular-ui-tree.min.css",
                "~/Css/app.css",
                "~/Css/common.css",
                "~/Css/footer.css",
                "~/Css/header.css",
                "~/Css/micro.css",
                "~/Css/side_left.css"));

            bundles.Add(new ScriptBundle("~/js/framework").Include(
                "~/Frameworks/jquery/jquery-1.11.1.min.js",
                "~/Frameworks/bootstrap/js/bootstrap.min.js",
                "~/Frameworks/ewebeditor/ewebeditor.js",
                "~/Frameworks/angular/angular.js",
                "~/Frameworks/angular/angular-cookies.js",
                "~/Frameworks/angular/angular-sanitize.min.js",
                "~/Frameworks/angularTree/angular-ui-tree.min.js",
                "~/Frameworks/checklist-model/checklist-model.js",
                "~/Frameworks/angular/angular-ui-router.js",
                "~/Frameworks/es5/es5.js",
                "~/Frameworks/es5/es5-sham.min.js",
                "~/Frameworks/es5/es5-shim.min.js", 
                "~/Frameworks/laypage/laypage.js",
                "~/Frameworks/angular/angular-file-upload.js"
                ));
          
            bundles.Add(new ScriptBundle("~/js/app").Include(
                "~/App/common/common.service.js",
                "~/App/Common/prototype.func.js",
                "~/App/MicroCourse/microcourse.routes.js",
                "~/App/MicroCourse/microcourse.services.js",                
                "~/App/app.js",
                "~/App/module.js"
                ));
        }
    }
}
