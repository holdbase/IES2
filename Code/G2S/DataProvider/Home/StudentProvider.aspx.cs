using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.CC.Model.OC;
using IES.Service;
using IES.Service.Common;

namespace App.G2S.DataProvider
{
    public partial class StudentProvider : System.Web.UI.Page
    {
        /// <summary>
        /// 获取教学团队信息列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        //int ishistory, int pageindex, int pagesize
        public static List<StudentOC> StudentOC_List(int ishistory, int pageindex, int pagesize)
        {
            StudentOC studentoc = new StudentOC();
            IES.G2S.OC.BLL.OC.OCBLL ocbll = new IES.G2S.OC.BLL.OC.OCBLL();
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            studentoc.IsHistory = ishistory;
            studentoc.UserID = user.UserID;

            //List<StudentOC> studentoclist = new List<StudentOC>();
            return ocbll.StudentOC_List(studentoc, pageindex, pagesize);

            //for (int i = 0; i < studentoclist.Count; i++)
            //{
            //    studentoclist[i].ImgFileUrl = FileService.g(responseList[i].UserID);
            //}
            //return studentoclist;


        }

        [WebMethod]
        public static int GetUserSpace()
        {
            return Convert.ToInt32(Browse.UserSpace);
        }
    }
}