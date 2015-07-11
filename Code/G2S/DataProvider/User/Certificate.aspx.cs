using IES.CC.Model.PBL;
using IES.Security;
using IES.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace App.G2S.DataProvider.User
{
    public partial class Certificate : System.Web.UI.Page
    {

        #region 证书

        // 获取我的证书列表
        [WebMethod]
        public static List<IES.CC.Model.Test.MyCertificate> Certificate_List()
        {
            string userid = IESCookie.GetCookieValue("ies");
            //string userid = "38";
            IES.CC.Model.Test.MyCertificate model = new IES.CC.Model.Test.MyCertificate { UserID = int.Parse(userid) };
            return new IES.G2S.CourseLive.BLL.Test.CertificateBLL().Certificate_List(model);
        }

        //获取证书图片
        [WebMethod]
        public static string OCIMGURL(int OCID) 
        {
            //IES.CC.Model.Test.MyCertificate model = new IES.CC.Model.Test.MyCertificate { OCID = OCID };            
            return FileService.OCIMGURL(OCID);
        }

        //获取证书的详细信息
        [WebMethod]
        public static IES.CC.Model.Test.MyCertificate MyCertificate_Get(int CertificateID)
        {
            IES.CC.Model.Test.MyCertificate model = new IES.CC.Model.Test.MyCertificate { CertificateID = CertificateID };
            return new IES.G2S.CourseLive.BLL.Test.CertificateBLL().MyCertificate_Get(model);
        }

        //设置真实姓名
        [WebMethod]
        public static bool Certificate_Upd(string RealName)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User model = new IES.JW.Model.User { UserID = int.Parse(userid), RealName = RealName };
            return new IES.G2S.CourseLive.BLL.Test.CertificateBLL().Certificate_Upd(model);
        }

        //获取真实姓名
        [WebMethod]
        public static IES.JW.Model.User RealName_Get()
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User model = new IES.JW.Model.User { UserID = int.Parse(userid)};
            return new IES.G2S.CourseLive.BLL.Test.CertificateBLL().RealName_Get(model);
        }

        #endregion

    }
}