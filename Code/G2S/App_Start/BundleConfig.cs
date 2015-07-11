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

            //�������js �������Ҫ���ص�
            bundles.Add(new ScriptBundle("~/js/framework").Include(
                   

                     "~/js/es5.js",   //����IE8�����,����Ҫ�� 


                      "~/js/jquery-1.8.3.min.js",

                    //layer������ؼ�
                    "~/Frameworks/layer/layer.min.js",
                    //end
                    //ͳ��ͼ
                   "~/Frameworks/echarts-2.0.1/echarts-2.2.js",
                    //end
                    "~/js/G2S.js",
                     //"~/Frameworks/jquery/jquery-1.11.1.min.js",  //���jq�汾������ ������һЩ��Ҫjq�Ŀ��
                    "~/Frameworks/bootstrap/js/bootstrap.min.js",
                    "~/Frameworks/angular/angular.js",
                    "~/Frameworks/angular/angular-ui-router.min.js",
                    "~/Frameworks/angular/angular-cookies.min.js",

                    "~/Frameworks/bootstrap/js/bootstrap-modal.js",
                     "~/Frameworks/bootstrap/js/angular-ui-tree.js",
                    "~/Frameworks/bootstrap/js/bootstrap-transition.js",
                    //��ҳ�ؼ�
                     "~/Frameworks/laypage/laypage.js",
                     "~/Frameworks/My97DatePicker/WdatePicker.js",
                    //end
                    //���ڿؼ�
                    "~/Frameworks/laydate/laydate.js",
                    //end
                    //zTree���ؼ�
                    "~/Frameworks/zTree_v3/js/jquery.ztree.all-3.5.js",
                    //end
                     "~/js/es5-shim.min.js",
                     "~/js/es5-sham.min.js",
                   "~/Frameworks/angular/console-sham.js",
                   "~/Frameworks/angular/angular-file-upload.js"
                
                ));
            //�������js ����Ҫ�е�
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
            //��Ӧ_Layout.cshtml ����ʽ
            bundles.Add(new StyleBundle("~/content/css/Layout").Include(
                   "~/Css/footer.css",
                   "~/Css/header.css",
                //"~/Css/index.css",
                   "~/Css/side_left.css",
                //"~/Css/reverse.css", //�ǹ�����ʽ ȥ��
                   "~/Frameworks/bootstrap/css/bootstrap.css",
                   "~/Css/common.css",
                // "~/Css/class.css",//�ǹ�����ʽ ȥ��
                //��ҳ�����ʽ
                   "~/Frameworks/laypage/skin/laypage.css",
                //end
                   "~/Frameworks/laydate/need/laydate.css",
                   "~/Frameworks/laydate/skin/default/laydate.css",
                   "~/Frameworks/laydate/skin/molv/laydate.css"
               ));
            //��Ӧ_Layout.cshtml ��js
            bundles.Add(new ScriptBundle("~/js/Layout").Include(

                 // "~/js/G2S.js",
                // "~/js/TopMaster.js",
                //   "~/js/leftMaster.js",
                //   "~/js/FootMaster.js",
                // "~/js/index.js"
                 "~/js/common.js"
                // "~/js/construction.js" //�����index.js��ͻ ���Բ���Ҫ�� guokaiju 
                //"~/Scripts/directive/datepicker.js",
                //"~/js/bootstrap.js",
                //"~/js/bootstrap-datepicker.js"
                ));


            //��Ӧ_Layout2.cshtml ����ʽ
            bundles.Add(new StyleBundle("~/content/css/Layout2").Include(
                 "~/Frameworks/bootstrap/js/angular-ui-tree.min.css",
                //"~/Css/construction.css",
                   "~/Frameworks/bootstrap/css/bootstrap.css"
               ));

            //��Ӧ_Layout2.cshtml  ��js
            bundles.Add(new ScriptBundle("~/js/Layout2").Include(

                //"~/js/G2S.js",
                "~/js/construction.js"
            ));

            //��Ӧ_Layout3.cshtml ����ʽ
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
            //��Ӧ_Layout3.cshtml ����ʽ
            bundles.Add(new StyleBundle("~/content/css/Layout6").Include(
                "~/Css/header.css",
                "~/Css/common.css",
                "~/Frameworks/bootstrap/css/bootstrap.css",
                "~/Css/side_left.css",
                "~/Css/reverse.css",
                "~/Css/footer.css"
            ));
            //��Ӧ_Layout11.cshtml ����ʽ
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
