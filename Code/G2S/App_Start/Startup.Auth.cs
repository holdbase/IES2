// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Startup.Auth.cs" company="Microsoft">
//   Copyright ?2014 Microsoft
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.G2S
{
    using Microsoft.AspNet.Identity;
    using Microsoft.Owin;
    using Microsoft.Owin.Security.Cookies;
    using Owin;
    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
           ///  Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/login")
            });

          //   Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            //// Uncomment the following lines to enable logging in with third party login providers
            ////app.UseMicrosoftAccountAuthentication(
            ////    clientId: "",
            ////    clientSecret: "");

            ////app.UseTwitterAuthentication(
            ////   consumerKey: "",
            ////   consumerSecret: "");

            ////app.UseFacebookAuthentication(
            ////   appId: "",
            ////   appSecret: "");

            ////app.UseGoogleAuthentication();
        }
    }


    public class PreApplicationStartCode
    {
        //private static bool _isStarting;

        //public static void PreStart()
        //{
        //    if (!_isStarting)
        //    {
        //        _isStarting = true;

        //        //注意这里的动态注册，此静态方法在Microsoft.Web.Infrastructure.DynamicModuleHelper
        //        DynamicModuleUtility.RegisterModule(typeof(App.G2S.HttpModule.URLParamModule));
        //    }
        //}
    }


}
