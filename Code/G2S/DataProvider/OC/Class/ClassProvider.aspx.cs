using IES.CC.OC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.G2S.OC.BLL.OC;
using System.IO;
using System.Data;
using IES.Common;
using IES.G2S.JW.BLL;
using IES.JW.Model;
using IES.Service;
using IES.Security;
namespace App.G2S.DataProvider
{
    public partial class ClassProvider : System.Web.UI.Page
    {
        //protected void Page_Load(object sender, EventArgs e)
        //{
        //    ExportAllClassStudent("-1", 1, true);
        //}


        [WebMethod]
        public static List<OCClass> ClassList(OCClass model, int PageIndex, int PageSize)
        {
            if (!UserService.OC_IsRole(model.OCID))
            {
                return new List<OCClass>();
            }


            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCClass_List(model, PageIndex, PageSize);
        }

        /// <summary>
        /// 获取教师列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.JW.Model.Teacher> Teacher_List(Teacher teacher, int pageindex, int pagesize)
        {
            UserBLL userbll = new UserBLL();
            return userbll.Teacher_List(teacher, pageindex, pagesize);
        }

        [WebMethod]
        public static bool OCClass_RegNum_Upd(OCClass model)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCClass_RegNum_Upd(model);
        }

        [WebMethod]
        public static bool OCClass_IsHistroy_Upd(OCClass model)
        {
            if (!UserService.OC_IsRole(model.OCID))
            {
                return false;
            }

            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCClass_IsHistroy_Upd(model);
        }

        [WebMethod]
        public static bool OCClass_Del(OCClass model)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCClass_Del(model);
        }

        [WebMethod]
        public static bool OCClass_InputOutAll(OCClass model)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return true;// oCClassBLL.OCClass_IsHistroy_Upd(model);
        }

        /// <summary>
        /// 获取编辑教学班学生信息
        /// </summary>
        /// <param name="occlassid"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassStudent> OCClassStudent_List(OCClass occlass, int PageIndex, int PageSize)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCClassStudent_List(occlass, PageIndex, PageSize);
        }

        /// <summary>
        /// 学生申请待审列表
        /// </summary>
        /// <param name="regstudentmodel"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassRegStudent> OCClassRegStudent_List(ExamineModel examinemodel, int PageIndex, int PageSize)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            examinemodel.OCID = user.UserID;
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCClassRegStudent_List(examinemodel, PageIndex, PageSize);
        }

        /// <summary>
        /// 审核
        /// </summary>
        /// <param name="regstudentmodel"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool Save_BatchExamine(ExamineModel examinemodel)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.Save_BatchExamine(examinemodel);
        }

        /// <summary>
        /// 删除网络招生下的学生
        /// </summary>
        /// <param name="regstudentmodel"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool OCMoocRecruitStudent_Del(int RecruitID, string UserIDs)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruitStudent_Del(RecruitID, UserIDs);
        }
        /// <summary>
        /// 修改网络招生下的学生审核状态
        /// </summary>
        /// <param name="regstudentmodel"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool OCMoocRecruitStudent_Status_Upd(int RecruitID, string UserIDs,int Status)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruitStudent_Status_Upd(RecruitID, UserIDs, Status);
        }






        /// <summary>
        /// 教学班添加学生搜索
        /// </summary>
        /// <param name="occlassid"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassStudent> OCClass_Student_List(OCClassStudent occlassid, int PageIndex, int PageSize)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCClass_Student_List(occlassid, PageIndex, PageSize);
        }
        /// <summary>
        /// 获取编辑教学班
        /// </summary>
        /// <param name="occlass"></param>
        /// <returns></returns>
        [WebMethod]
        public static OCClass OCClass_Get(OCClass occlass)
        {

            if (!UserService.OC_IsRole(occlass.OCID))
            {
                return null;
            }

            OCClassBLL oCClassBLL = new OCClassBLL();

            return oCClassBLL.OCClass_Get(occlass);
        }
        /// <summary>
        /// 获取编辑教学班授课教师
        /// </summary>
        /// <param name="occlass"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCTeamDropdownList> OCTeam_Dropdown_List(OCTeamDropdownList occlass)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();

            return oCClassBLL.OCTeam_Dropdown_List(occlass);
        }
        /// <summary>
        /// 行政班列表
        /// </summary>
        /// <param name="occlass"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.JW.Model.Class> Class_List(IES.JW.Model.Class model, int PageIndex, int PageSize)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();

            return oCClassBLL.Class_List(model, PageIndex, PageSize);
        }

        /// <summary>
        /// 通过行政班添加学生获取行政班列学生表
        /// </summary>
        /// <param name="occlass"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassStudent> ClassStudent_List(IES.JW.Model.Class occlass, List<OCClassStudent> occlassstudentlist, int PageIndex, int PageSize)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();

            return oCClassBLL.ClassStudent_List(occlass, occlassstudentlist, PageIndex, PageSize);
        }

        /// <summary>
        /// 通过搜索添加学生
        /// </summary>
        /// <param name="occlass"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassStudent> SelectSelectedStudent_List(List<OCClassStudent> occlassstudentsearchlist, List<OCClassStudent> occlassstudentlist)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();

            return oCClassBLL.SelectSelectedStudent_List(occlassstudentsearchlist, occlassstudentlist);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileUrl">要导入的excel文件路径</param>
        /// <param name="occlassstudentlist">已添加的学生列表</param>
        /// <returns>列表集合</returns>
        /// 
        [WebMethod]
        public static List<OCClassStudent> ImportStudent_List(string fileUrl, int teachingclassid, List<OCClassStudent> occlassstudentlist)
        {
            DataTable dt = new DataTable();
            dt = NPOIHandler.ExcelToDataTable(fileUrl, "Student");

            OCClassBLL oCClassBLL = new OCClassBLL();
            List<OCClassStudent> newList = new List<OCClassStudent>();
            //newList = IES.Common.ListToDateUtil.ConvertTo<OCClassStudent>(dt);
            //begin检查用户
            string userNo = "";
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                userNo += dt.Rows[i]["UserNo"].ToString() + ",";
            }
            if (userNo != "" && userNo.IndexOf(',') > 0)
            {
                userNo = userNo.Substring(0, userNo.Length - 1);
            }
            newList = oCClassBLL.CheckUserExice(userNo, teachingclassid);
            //end检查用户
            return oCClassBLL.SelectSelectedStudent_List(newList, occlassstudentlist);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileUrl">要导入的excel文件路径</param>
        /// <param name="occlassstudentlist">OCClassID</param>
        /// <returns>列表集合</returns>
        /// 
        [WebMethod]
        public static string TeachingClassStudent_List(string fileUrl, string OCClassID)
        {
            DataTable dt = new DataTable();
            dt = NPOIHandler.ExcelToDataTable(fileUrl, "Student");

            OCClassBLL oCClassBLL = new OCClassBLL();
            List<OCClassStudent> newList = new List<OCClassStudent>();
            string UserNos = "";
            //int sucessnum = 0;
            //int lostNum = 0;
            //int allnum = dt.Rows.Count;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                //int result = oCClassBLL.OCClassStudent_Import(teachingclassid, dt.Rows[i]["UserNo"].ToString());
                //if (result == 1)
                //{
                //    sucessnum++;
                //}
                //else if (result == 0)
                //{
                //    lostNum++;
                //}

                UserNos += dt.Rows[i]["UserNo"].ToString() + ",";
            }
            if (UserNos != "" && UserNos.IndexOf(',') > 0)
            {
                UserNos = UserNos.Substring(0, UserNos.Length - 1);
            }
            //return "成功导入学生："sucessnum.ToString() + "@" + lostNum.ToString();
            return oCClassBLL.OCClassStudent_Import(UserNos, OCClassID);
            //end检查用户

        }


        /// <summary>
        /// 全选
        /// </summary>
        /// <param name="occlassstudentsearchlist"></param>
        /// <param name="occlassstudentlist"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassStudent> SelectAll_List(List<OCClassStudent> occlassstudentsearchlist, bool isselectall)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();

            return oCClassBLL.SelectAll_List(occlassstudentsearchlist, isselectall);
        }

        /// <summary>
        /// 单页全选
        /// </summary>
        /// <param name="occlassstudentsearchlist"></param>
        /// <param name="occlassstudentlist"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassStudent> Select_Page_List(List<OCClassStudent> occlassstudentsearchlist, bool isselectall, int PageIndex, int PageSize)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();

            return oCClassBLL.Select_Page_List(occlassstudentsearchlist, isselectall, PageIndex, PageSize);
        }


        [WebMethod]
        public static OCClass OCClass_Edit(OCClass occlass, List<OCTeamDropdownList> octeamdropdownlist, List<OCClassStudent> occlassstudent)
        {
            if (!UserService.OC_IsRole(occlass.OCID))
            {
                return null;
            }
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCClass_Edit(occlass, octeamdropdownlist, occlassstudent);
        }

        /// <summary>
        /// 删除学生
        /// </summary>
        /// <param name="occlass"></param>
        /// <param name="octeamdropdownlist"></param>
        /// <param name="occlassstudent"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassStudent> DeleteStudent(OCClassStudent occlassstudent, List<OCClassStudent> occlassstudentlist)
        {
            //return occlassstudentlist;
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.DeleteStudent(occlassstudent, occlassstudentlist);
        }

        [WebMethod]
        public static List<OCClassStudent> BatchDeleteStudent(List<OCClassStudent> occlassstudentlist)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.BatchDeleteStudent(occlassstudentlist);
        }

        /// <summary>
        /// 获取网络招生列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<OCMoocRecruit> OCMoocRecruit_List(OCMoocRecruit ocmoocrecruit, int PageIndex, int PageSize)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruit_List(ocmoocrecruit, PageIndex, PageSize);
        }

        /// <summary>
        /// 获取网络招生注册列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<OCMoocRecruit> OCMoocRecruitClassDesc_List(ShortOCMoocClass shortocmoocclass)
        {
            int userid = -1;
            try
            {
                userid = Convert.ToInt32(IESCookie.GetCookieValue("ies"));
            }
            catch
            {
                try
                {
                    userid = IES.Service.UserService.CurrentUser.UserID;
                }
                catch
                {
                    userid = -1;
                }
            }
            shortocmoocclass.UserID = userid;
            //int UserID = UserService.CurrentUser.UserID;
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruitClassDesc_List(shortocmoocclass);
        }


        ///// <summary>
        ///// 获取网络招生注册列表
        ///// </summary>
        ///// <returns></returns>
        //[WebMethod]
        //public static List<OCMoocRecruit> OCMoocRecruitClassDesc_List(int OCID)
        //{
        //    ShortOCMoocClass shortocmoocclass = new ShortOCMoocClass();
        //    shortocmoocclass.OCID = OCID;
        //    shortocmoocclass.UserID = UserService.CurrentUser.UserID;
        //    //ocmoocrecruit.UserID = UserService.CurrentUser.UserID;
        //    OCClassBLL oCClassBLL = new OCClassBLL();
        //    return oCClassBLL.OCMoocRecruitClassDesc_List(shortocmoocclass);
        //}

        /// <summary>
        /// 用户注册
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static int OCMoocRecruitClass_Join(ShortOCMoocClass shortocmoocclass)
        {
            int userid = -1;
            try
            {
                userid = Convert.ToInt32(IESCookie.GetCookieValue("ies"));
            }
            catch
            {
                try
                {
                    userid = IES.Service.UserService.CurrentUser.UserID;
                }
                catch
                {
                    userid = -1;
                }
            }
            shortocmoocclass.UserID = userid;

            OCClassBLL oCClassBLL = new OCClassBLL();
            if (oCClassBLL.OCMoocRecruitClass_Join(shortocmoocclass))
            {
                return 1;
            }
            else
            {
                return 0;
            }

        }

        /// <summary>
        /// 暂停网络招生列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static bool OCMoocRecruit_RecruitStatus_Upd(int recruitID, int OCID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return false;
            }
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruit_RecruitStatus_Upd(recruitID);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static bool OCMoocRecruit_History_Upd(int recruitID, int OCID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return false;
            }

            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruit_History_Upd(recruitID);

        }
        /// <summary>
        /// 网络招生注册码修改
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static bool OCMoocRecruit_RegNum_Upd(OCMoocRecruit ocmoocrecruit)
        {
            if (!UserService.OC_IsRole(ocmoocrecruit.OCID))
            {
                return false;
            }
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruit_RegNum_Upd(ocmoocrecruit);
        }

        /// <summary>
        /// 网络招生删除
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static bool OCMoocRecruit_Del(int recruitid, int OCID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return false;
            }
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruit_Del(recruitid);
        }
        /// <summary>
        /// 获取某网络招生下的教学班
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<ShortOCMoocClass> OCMoocRecruitClass_Dropdown_List(ShortOCMoocClass shortocmoocclass)
        {
            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruitClass_Dropdown_List(shortocmoocclass);
        }

        /// <summary>
        /// 编辑新增网络招生
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static OCMoocRecruit OCMoocRecruit_Edit(OCMoocRecruit ocmoocrecruit)
        {
            if (!UserService.OC_IsRole(ocmoocrecruit.OCID))
            {
                return null;
            }

            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruit_Edit(ocmoocrecruit);
        }


        /// <summary>
        /// 获取某网络招生下的教学班学生列表 
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClassStudent> OCMoocRecruitClassStudent_List(ShortSearchModel searchmodel, int PageIndex, int PageSize)
        {
            if (!UserService.OC_IsRole(searchmodel.OCID))
            {
                return new List<OCClassStudent>();
            }

            OCClassBLL oCClassBLL = new OCClassBLL();
            return oCClassBLL.OCMoocRecruitClassStudent_List(searchmodel, PageIndex, PageSize);
        }
        /// <summary>
        /// 导出学生
        /// </summary>
        /// <param name="teachingClassID"> -1 导出全部班级  1，2导出指定班级  </param>
        /// <param name="oCID"> 指定课程  </param>
        /// <param name="isHistory"> false在读 true结业  </param>
        /// <returns></returns>
        [WebMethod]
        public static string ExportAllClassStudent(string teachingClassID, int oCID, bool isHistory)
        {
            if (!UserService.OC_IsRole(oCID))
            {
                return "";
            }

            string fileUrl = "";
            DataSet ds = new DataSet();
            List<ExportOCClassStudent> occlassstudentlist = new List<ExportOCClassStudent>();
            OCClassBLL oCClassBLL = new OCClassBLL();
            occlassstudentlist = oCClassBLL.ExportAllClassStudent(teachingClassID, oCID, isHistory);
            foreach (var item in occlassstudentlist)
            {
                ds.Tables.Add(IES.Common.ListToDateUtil.ListToDataTable<OCClassStudent>(item.ClassStudent));
            }

            string sheetNames = "";
            string headerName = "学号,姓名,专业，行政班，年级";
            for (int i = 0; i < ds.Tables.Count; i++)
            {
                sheetNames += "政班" + i + ds.Tables[i].Rows[0]["TeachingClassName"] + ",";
                ds.Tables[i].Columns.Remove("EntryDate");
                ds.Tables[i].Columns.Remove("MOOCLearningPace");
            }
            if (!string.IsNullOrEmpty(sheetNames))
            {
                sheetNames = sheetNames.Substring(0, sheetNames.Length - 1);
            }

            try
            {
                fileUrl = NPOIHandler.ExportDataSetToExcelMVC(ds, "StudentAll.xls", sheetNames, headerName);
            }
            catch (Exception e)
            {
                fileUrl = "";
            }
            return fileUrl;
        }
    }
}