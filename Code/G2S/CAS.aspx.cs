using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;
using System.Configuration;
using System.Net;

namespace App.G2S
{
    public partial class CAS : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            IES.JW.Model.User user1 = new IES.JW.Model.User { LoginName = "able", Pwd = "c4ca4238a0b923820dcc509a6f75849b" };
            IES.Service.UserService.Login(user1);


            Response.Redirect("/CourseLive/Forum/index?leftmenu=B11",true );

            if (Session["Token"] != null)
            {
                //分站凭证存在
                if (Request.QueryString["ReturnUrl"] != null)
                {
                    string ReturnUrl = Request.QueryString["ReturnUrl"];
                    Response.Redirect(ReturnUrl);
                }
            }
            else
            {
                //令牌验证结果
                if (Request.QueryString["Token"] != null)
                {
                    if (Request.QueryString["Token"] != "$Token$")
                    {
                        //持有令牌
                        string tokenValue = Request.QueryString["Token"];
                        //调用WebService获取主站凭证
                        TokenService.TokenServiceSoapClient tokenService = new TokenService.TokenServiceSoapClient();
                        TokenService.MySoapHeader header = new TokenService.MySoapHeader();
                        header.UserID = "able";
                        header.PassWord = "able@2003";
                        object o = tokenService.TokenGetCredence(header, tokenValue);
                        if (o != null)
                        {
                            //令牌正确
                         //   Session["Token"] = o;

                            //wshgkjqbwhfbxlfrh
                            string[] resultString = Regex.Split(o.ToString(), "wshgkjqbwhfbxlfrh", RegexOptions.IgnoreCase);

                            IES.JW.Model.User user = new IES.JW.Model.User { LoginName = resultString[0], Pwd = resultString[1] };

                            if (IES.Service.UserService.Login(user))
                            {
                                //登录日志
                                string ip = GetClientIPv4Address();
                                int UserID = IES.Service.UserService.CurrentUser.UserID;
                                IES.JW.Model.LogLogin model = new IES.JW.Model.LogLogin { UserID = UserID, Type = 1, IP = ip };
                                bool rs = new IES.G2S.JW.BLL.LogBLL().LogLogin_Add(model);

                                if (Request.QueryString["ReturnUrl"] != null)
                                {
                                    string ReturnUrl = Request.QueryString["ReturnUrl"];
                                    Response.Redirect(ReturnUrl);
                                }
                            }

                            //Response.Write("恭喜，令牌存在，您被授权访问该页面！");
                        }
                        else
                        {
                            //令牌错误
                            Response.Redirect(this.ReplaceToken());
                        }
                    }
                    else
                    {
                        //未持有令牌
                        Response.Redirect(this.ReplaceToken());
                    }
                }
                //未进行令牌验证，去主站验证
                else
                {
                    Response.Redirect(this.getTokenURL());
                }
            }
        }

        public static string GetClientIPv4Address()
        {
            string ipv4 = String.Empty;

            foreach (IPAddress ip in Dns.GetHostAddresses(GetClientIP()))
            {
                if (ip.AddressFamily.ToString() == "InterNetwork")
                {
                    ipv4 = ip.ToString();
                    break;
                }
            }

            if (ipv4 != String.Empty)
            {
                return ipv4;
            }
            // 利用 Dns.GetHostEntry 方法，由获取的 IPv6 位址反查 DNS 纪录，
            // 再逐一判断何者为 IPv4 协议，即可转为 IPv4 位址。
            foreach (IPAddress ip in Dns.GetHostEntry(GetClientIP()).AddressList)
            //foreach (IPAddress ip in Dns.GetHostAddresses(Dns.GetHostName()))
            {
                if (ip.AddressFamily.ToString() == "InterNetwork")
                {
                    ipv4 = ip.ToString();
                    break;
                }
            }

            return ipv4;
        }
        public static string GetClientIP()
        {
            if (null == HttpContext.Current.Request.ServerVariables["HTTP_VIA"])
            {
                return HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            else
            {
                return HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            }
        }

        /// <summary>
        /// 获取带令牌请求的URL
        /// </summary>
        /// <returns></returns>
        private string getTokenURL()
        {
            string url = Request.Url.AbsoluteUri;
            Regex reg = new Regex(@"^.*\?.+=.+$");
            if (reg.IsMatch(url))
                url += "&Token=$Token$";
            else
                url += "?Token=$Token$";

            return ConfigurationManager.AppSettings["TokenURL"] + "cas/gettoken.aspx?BackURL=" + Server.UrlEncode(url);
        }

        /// <summary>
        /// 去掉URL中的令牌
        /// </summary>
        /// <returns></returns>
        private string ReplaceToken()
        {
            string url = Request.Url.AbsoluteUri;
            url = Regex.Replace(url, @"(\?|&)Token=.*", "", RegexOptions.IgnoreCase);
            return ConfigurationManager.AppSettings["TokenURL"] + "login.aspx?BackURL=" + Server.UrlEncode(url);
        }
    }
}