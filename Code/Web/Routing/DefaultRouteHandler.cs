// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRouteHandler.cs" company="">
//   Copyright ?2014 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.Resource.Routing
{
    using System;
    using System.Web;
    using System.Web.Routing;
    using System.Web.WebPages;
    using IES.Security;
    public class DefaultRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {

            try
            {
                var filePath = requestContext.HttpContext.Request.AppRelativeCurrentExecutionFilePath;

                if (filePath == "~/")
                {
                    filePath = "~/views/index.cshtml";
                }
                else
                {
                    if (!filePath.StartsWith("~/views/", StringComparison.OrdinalIgnoreCase))
                    {
                        filePath = filePath.Insert(2, "views/");
                    }

                    if (!filePath.EndsWith(".cshtml", StringComparison.OrdinalIgnoreCase))
                    {
                        filePath = filePath += ".cshtml";
                    }
                }
               
                var handler = WebPageHttpHandler.CreateFromVirtualPath(filePath); // returns NULL if .cshtml file wasn't found

                if (handler == null)
                {
                    requestContext.RouteData.DataTokens.Add("templateUrl", "/views/404");
                    handler = WebPageHttpHandler.CreateFromVirtualPath("~/views/404.cshtml");
                }
                else
                {
                    requestContext.RouteData.DataTokens.Add("templateUrl", filePath.Substring(1, filePath.Length - 8));
                }

                return handler;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
