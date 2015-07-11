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
            IES.Service.AuService.AuLoad(); //�û���Ȩ��Ϣ����
            GetAttachList();
            //RegisterRoutes(RouteTable.Routes);


        }

        /// <summary>
        /// ��ȡ�����б�
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

        //�ڽ��յ�һ��Ӧ�ó�������ʱ����������һ��������˵�����ǵ�һ�����������¼�������һ�����û������һ��ҳ������URL����
        void Application_BeginRequest(object sender, EventArgs e)
        {
            //string q = "<div style='position:fixed;top:0px;width:100%;height:100%;background-color:white;color:green;font-weight:bold;border-bottom:5px solid #999;'><br>�����ύ���в��Ϸ�����,лл����!<br></div>";
            //if (Request.Cookies != null)
            //{
            //    if (safe_360.CookieData())
            //    {
            //        // Response.Write(q);  //������� ���ε����guokaiju
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
