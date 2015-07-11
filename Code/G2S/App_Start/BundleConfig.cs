// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BundleConfig.cs" company="Microsoft">
//   Copyright ?2014 Microsoft
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.G2S
{
    using System.Web;
    using System.Web.Optimization;

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            //公共框架js 这个必须要加载的
            bundles.Add(new ScriptBundle("~/js/framework").Include(
                   

                     "~/js/es5.js",   //兼容IE8浏览器,必须要的 


                      "~/js/jquery-1.8.3.min.js",

                    //layer弹出层控件
                    "~/Frameworks/layer/layer.min.js",
                    //end
                    //统计图
                   "~/Frameworks/echarts-2.0.1/echarts-2.2.js",
                    //end
                    "~/js/G2S.js",
                     //"~/Frameworks/jquery/jquery-1.11.1.min.js",  //这个jq版本过低了 不兼容一些需要jq的框架
                    "~/Frameworks/bootstrap/js/bootstrap.min.js",
                    "~/Frameworks/angular/angular.js",
                    "~/Frameworks/angular/angular-ui-router.min.js",
                    "~/Frameworks/angular/angular-cookies.min.js",

                    "~/Frameworks/bootstrap/js/bootstrap-modal.js",
                     "~/Frameworks/bootstrap/js/angular-ui-tree.js",
                    "~/Frameworks/bootstrap/js/bootstrap-transition.js",
                    //分页控件
                     "~/Frameworks/laypage/laypage.js",
                     "~/Frameworks/My97DatePicker/WdatePicker.js",
                    //end
                    //日期控件
                    "~/Frameworks/laydate/laydate.js",
                    //end
                    //zTree树控件
                    "~/Frameworks/zTree_v3/js/jquery.ztree.all-3.5.js",
                    //end
                     "~/js/es5-shim.min.js",
                     "~/js/es5-sham.min.js",
                   "~/Frameworks/angular/console-sham.js",
                   "~/Frameworks/angular/angular-file-upload.js"
                
                ));
            //公共框架js 必须要有的
            bundles.Add(new ScriptBundle("~/js/app").Include(
                  "~/scripts/common/directives.js",

                  "~/scripts/common/filters.js",
                  "~/scripts/common/services.js",
                  "~/scripts/controllers/OC/Site/SiteController.js",
                  "~/scripts/controllers/OC/FC/FCController.js",
                  "~/scripts/controllers/OC/FC/FCAddController.js",
                  "~/scripts/controllers/OC/FC/FCLearnController.js",
                  "~/scripts/controllers/OC/Class/ClassController.js",
                  "~/scripts/controllers/OC/MOOC/MOOCController.js",
                  "~/scripts/controllers/OC/Team/TeamController.js",
                  "~/scripts/controllers/home/HomeController.js",
                  "~/scripts/controllers/home/StudentController.js",
                  "~/scripts/controllers/user/UserController.js",
                  "~/scripts/services/user/UserService.js",
                  "~/scripts/controllers/CourseLive/Forum/ForumController.js",
                  "~/scripts/controllers/CourseLive/Score/ScoreController.js",
                  "~/scripts/controllers/CourseLive/Test/TestController.js",
                  "~/scripts/controllers/CourseLive/Test/TestAddController.js",
                  "~/scripts/controllers/CourseLive/Test/MarkingController.js",
                  "~/scripts/controllers/CourseLive/Test/markingCardController.js",
                  "~/scripts/controllers/CourseLive/Test/DoHomeWork.js",
                  "~/scripts/controllers/CourseLive/Test/DoCardExercise.js",
                  "~/scripts/controllers/CourseLive/Test/ViewResults.js",
                  "~/scripts/controllers/CourseLive/Test/PeerAssessment.js",
                  "~/scripts/controllers/CourseLive/Test/CardPeerAssessment.js",
                  "~/scripts/controllers/CourseLive/Test/EveryWorkCtrl.js",
                  "~/scripts/controllers/OC/MOOC/MOOCPreviewController.js",
                  "~/scripts/controllers/CourseLive/Test/HomeWorkController.js",
                  "~/scripts/controllers/Affairs/AffairsController.js",
                  "~/scripts/controllers/CourseLive/StudyProgress/StudyProgressController.js",
                  "~/scripts/controllers/CourseLive/Survey/SurveyController.js",
                   "~/scripts/controllers/OC/CourseIndexController.js",
                   "~/scripts/controllers/OC/Site/SitePreviewController.js",
                   "~/scripts/controllers/Resource/Paper/PaperAddController.js",
                   "~/scripts/controllers/CourseLive/Test/StudentWorkListCtrl.js",
                    "~/scripts/controllers/CourseLive/Survey/SurverEditCtrl.js",
                   "~/scripts/controllers/Resource/Paper/PaperIndexController.js",
                   "~/scripts/controllers/Resource/Paper/BrowsePaper.js",
                   "~/scripts/controllers/Resource/Paper/BrowseCard.js",
                  "~/Template/template.js",
                  "~/scripts/app.js"



              ));
            //对应_Layout.cshtml 的样式
            bundles.Add(new StyleBundle("~/content/css/Layout").Include(
                   "~/Css/footer.css",
                   "~/Css/header.css",
                //"~/Css/index.css",
                   "~/Css/side_left.css",
                //"~/Css/reverse.css", //非公共样式 去掉
                   "~/Frameworks/bootstrap/css/bootstrap.css",
                   "~/Css/common.css",
                // "~/Css/class.css",//非公共样式 去掉
                //分页插件样式
                   "~/Frameworks/laypage/skin/laypage.css",
                //end
                   "~/Frameworks/laydate/need/laydate.css",
                   "~/Frameworks/laydate/skin/default/laydate.css",
                   "~/Frameworks/laydate/skin/molv/laydate.css"
               ));
            //对应_Layout.cshtml 的js
            bundles.Add(new ScriptBundle("~/js/Layout").Include(

                 // "~/js/G2S.js",
                // "~/js/TopMaster.js",
                //   "~/js/leftMaster.js",
                //   "~/js/FootMaster.js",
                // "~/js/index.js"
                 "~/js/common.js"
                // "~/js/construction.js" //这个和index.js冲突 所以不需要它 guokaiju 
                //"~/Scripts/directive/datepicker.js",
                //"~/js/bootstrap.js",
                //"~/js/bootstrap-datepicker.js"
                ));


            //对应_Layout2.cshtml 的样式
            bundles.Add(new StyleBundle("~/content/css/Layout2").Include(
                 "~/Frameworks/bootstrap/js/angular-ui-tree.min.css",
                //"~/Css/construction.css",
                   "~/Frameworks/bootstrap/css/bootstrap.css"
               ));

            //对应_Layout2.cshtml  的js
            bundles.Add(new ScriptBundle("~/js/Layout2").Include(

                //"~/js/G2S.js",
                "~/js/construction.js"
            ));

            //对应_Layout3.cshtml 的样式
            bundles.Add(new StyleBundle("~/content/css/Layout3").Include(
                   "~/Css/footer.css",
                   "~/Css/header.css",
                //"~/Css/index.css",
                //  "~/Css/side_left.css",
                // "~/Css/reverse.css",
                //"~/Frameworks/bootstrap/css/bootstrap.css",
                // "~/Css/datepicker.css",
                   "~/Frameworks/bootstrap/css/bootstrap.css",
                   "~/Css/common.css"
            ));
            //对应_Layout3.cshtml 的样式
            bundles.Add(new StyleBundle("~/content/css/Layout6").Include(
                "~/Css/header.css",
                "~/Css/common.css",
                "~/Frameworks/bootstrap/css/bootstrap.css",
                "~/Css/side_left.css",
                "~/Css/reverse.css",
                "~/Css/footer.css"
            ));
            //对应_Layout11.cshtml 的样式
            bundles.Add(new StyleBundle("~/content/css/Layout11").Include(
                "~/Css/header.css",
                "~/Css/common.css",
                "~/Css/side_left.css",
                "~/Css/record.css",
                "~/Css/footer.css"
            ));
        }
    }
}
