// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Global.asax.cs" company="Microsoft">
//   Copyright ?2014 Microsoft
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.G2S
{
    using System;


    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    using System.Collections;
    using System.Collections.Generic;
    using IES.JW.Model;

    public class Application : HttpApplication
    {
        protected void Application_Start()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //BundleTable.EnableOptimizations = true;
            //BundleTable.EnableOptimizations = false;
            IES.Service.AuService.AuLoad(); //用户授权信息加载
            GetAttachList();
            //RegisterRoutes(RouteTable.Routes);


        }

        /// <summary>
        /// 获取附件列表
        /// </summary>
        private void GetAttachList()
        { 
            
        }

         //public static void RegisterRoutes(RouteCollection routes)
         // {
         //      routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
         //      routes.MapRoute(
         //           "Default1", // Route name
         //           "{controller}/{action}/{id}", // URL with parameters
         //           new { controller = "Home", action = "Index", id = "" });
         //           // Parameter defaults );
         // }

        //在接收到一个应用程序请求时触发。对于一个请求来说，它是第一个被触发的事件，请求一般是用户输入的一个页面请求（URL）。
        void Application_BeginRequest(object sender, EventArgs e)
        {
            //string q = "<div style='position:fixed;top:0px;width:100%;height:100%;background-color:white;color:green;font-weight:bold;border-bottom:5px solid #999;'><br>您的提交带有不合法参数,谢谢合作!<br></div>";
            //if (Request.Cookies != null)
            //{
            //    if (safe_360.CookieData())
            //    {
            //        // Response.Write(q);  //输出报错 屏蔽掉输出guokaiju
            //        Response.End();

            //    }


            //}

            //if (Request.UrlReferrer != null)
            //{
            //    if (safe_360.referer())
            //    {
            //        // Response.Write(q);
            //        Response.End();
            //    }
            //}

            //if (Request.RequestType.ToUpper() == "POST")
            //{
            //    if (safe_360.PostData())
            //    {
            //        // Response.Write(q);
            //        Response.End();
            //    }
            //}
            //if (Request.RequestType.ToUpper() == "GET")
            //{
            //    if (safe_360.GetData())
            //    {
            //        // Response.Write(q);
            //        Response.End();
            //    }
            //}


        }

    }
}
