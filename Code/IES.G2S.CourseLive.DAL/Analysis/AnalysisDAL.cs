using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.DataBase;
using Dapper;
using System.Data;

namespace IES.G2S.CourseLive.DAL.Analysis
{
    public class AnalysisDAL
    {
        /// <summary>
        /// 统计在线学生数
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Analysis.AnalysisStudent> OnLineStudentCount_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@Type", model.Type);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisStudent>("OnLineStudentCount_Get", p, commandType: CommandType.StoredProcedure).ToList();
                    
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 学生活跃度排行
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Analysis.AnalysisStudent> StudentLiveness_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@TopCount", model.TopCount);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisStudent>("StudentLiveness_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 查看学生在线明细
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Analysis.AnalysisStudent> StudentOnlineDesc_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    p.Add("@TopCount", model.TopCount);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisStudent>("StudentOnlineDesc_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 统计登录人数占比
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static IES.CC.Model.Analysis.AnalysisStudent LoginStudentRate_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisStudent>("LoginStudentRate_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 获取在线课程教师的工作情况
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Analysis.AnalysisTeacher> OCTeacherWork_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisTeacher>("OCTeacherWork_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 教师活跃度对比
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Analysis.AnalysisTeacher> OCTeacherLiveness_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisTeacher>("OCTeacherLiveness_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 教师工作侧重分析
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static IES.CC.Model.Analysis.AnalysisTeacher OCTeacherFocusAnalysis_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisTeacher>("OCTeacherFocusAnalysis_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 在线课程资源汇总
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static IES.CC.Model.Analysis.AnalysisCourse FileSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisCourse>("FileSummary_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 在线课程习题汇总
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static IES.CC.Model.Analysis.AnalysisCourse ExerciseSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisCourse>("ExerciseSummary_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 在线课程知识点汇总
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static IES.CC.Model.Analysis.AnalysisCourse KenSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisCourse>("KenSummary_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 在线课程翻转课堂汇总
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static IES.CC.Model.Analysis.AnalysisCourse OCFCSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisCourse>("OCFCSummary_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 在线课程Mooc汇总
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static IES.CC.Model.Analysis.AnalysisCourse MoocSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    return conn.Query<IES.CC.Model.Analysis.AnalysisCourse>("MoocSummary_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
