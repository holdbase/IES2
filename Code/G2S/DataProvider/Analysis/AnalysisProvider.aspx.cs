using IES.CC.Model.Analysis;
using IES.G2S.CourseLive.BLL.Analysis;
using IES.JW.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace App.G2S.DataProvider.Analysis
{
    public partial class AnalysisProvider : System.Web.UI.Page
    {
        /// <summary>
        /// 判断用户是否课程拥有者
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool OC_IsRole(int OCID)
        {
            if (!IES.Service.UserService.OC_IsRole(OCID))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        #region 学生
        /// <summary>
        /// 统计在线学生数
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<AnalysisStudent> OnLineStudentCount_Get(int OCID, int Type, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, Type = Type, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };
            return new AnalysisBLL().OnLineStudentCount_Get(model);            
        }
        /// <summary>
        /// 学生活跃度
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<AnalysisStudent> StudentLiveness_Get(int OCID,int TopCount)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID=OCID,TopCount=TopCount};
            return new AnalysisBLL().StudentLiveness_Get(model);
        }
        /// <summary>
        /// 查看学生在线明细
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<AnalysisStudent> StudentOnlineDesc_Get(int OCID, string StartDate, string EndDate, int TopCount)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate), TopCount = TopCount };            
            return new AnalysisBLL().StudentOnlineDesc_Get(model);
        }
        /// <summary>
        /// 统计登录人数占比
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static AnalysisStudent LoginStudentRate_Get(int OCID, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate)};
            return new AnalysisBLL().LoginStudentRate_Get(model);
        }
        /// <summary>
        /// 获取本学期日期
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static Term Term_On_Get()
        {
            return new IES.G2S.JW.BLL.TermBLL().Term_On_Get();
        }
        #endregion

        #region 教师
        /// <summary>
        /// 获取在线课程教师的工作情况
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<AnalysisTeacher> OCTeacherWork_Get(int OCID, string StartDate,string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };
            return new AnalysisBLL().OCTeacherWork_Get(model);
        }
        /// <summary>
        /// 教师活跃度对比
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<AnalysisTeacher> OCTeacherLiveness_Get(int OCID, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };
            return new AnalysisBLL().OCTeacherLiveness_Get(model);
        }
        /// <summary>
        /// 教师工作侧重分析
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static AnalysisTeacher OCTeacherFocusAnalysis_Get(int OCID,int UserID, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID,UserID=UserID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };
            return new AnalysisBLL().OCTeacherFocusAnalysis_Get(model);
        }
        #endregion

        #region 课程
        /// <summary>
        /// 在线课程资源汇总
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static AnalysisCourse FileSummary_Get(int OCID, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };           
            return new AnalysisBLL().FileSummary_Get(model);
        }
        /// <summary>
        /// 在线课程习题汇总
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static AnalysisCourse ExerciseSummary_Get(int OCID, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };           
            return new AnalysisBLL().ExerciseSummary_Get(model);
        }
        /// <summary>
        /// 在线课程知识点汇总
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static AnalysisCourse KenSummary_Get(int OCID, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };           
            return new AnalysisBLL().KenSummary_Get(model);
        }
        /// <summary>
        /// 在线课程翻转课堂汇总
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static AnalysisCourse OCFCSummary_Get(int OCID, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };           
            return new AnalysisBLL().OCFCSummary_Get(model);
        }
        /// <summary>
        /// 在线课程Mooc汇总
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static AnalysisCourse MoocSummary_Get(int OCID, string StartDate, string EndDate)
        {
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = OCID, StartDate = Convert.ToDateTime(StartDate), EndDate = Convert.ToDateTime(EndDate) };           
            return new AnalysisBLL().MoocSummary_Get(model);
        }
        #endregion
    }
}