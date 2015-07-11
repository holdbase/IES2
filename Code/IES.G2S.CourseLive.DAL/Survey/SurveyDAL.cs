using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IES.CC.Model.OC;
using IES.CC.OC.Model;
using IES.DataBase;
using IES.JW.Model;
using IES.Resource.Model;

namespace IES.G2S.CourseLive.DAL.Survey
{
    public class SurveyDAL
    {
        #region 列表
        public static List<IES.CC.Model.Survey.Survey> Survey_MyCreate_List(IES.CC.Model.Survey.Survey model, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", model.UserID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<IES.CC.Model.Survey.Survey>("Survey_MyCreate_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public static List<IES.CC.Model.Survey.Survey> Survey_MyJoin_List(IES.CC.Model.Survey.Survey model, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", model.UserID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<IES.CC.Model.Survey.Survey>("Survey_MyJoin_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }


        public static List<IES.CC.Model.Survey.Survey> Survey_Simple_List(IES.CC.Model.Survey.Survey model, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", model.UserID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<IES.CC.Model.Survey.Survey>("Survey_Simple_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        #endregion

        #region 详细信息
        /// <summary>
        /// 获取调查问卷的详细信息
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static IES.CC.Model.Survey.Survey Survey_Get(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    return conn.Query<IES.CC.Model.Survey.Survey>("Survey_Get", p, commandType: CommandType.StoredProcedure).SingleOrDefault<IES.CC.Model.Survey.Survey>();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 获取调查问卷的详细信息
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static IES.CC.Model.Survey.SurveyInfo SurveyInfo_Get(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    IES.CC.Model.Survey.SurveyInfo SuInfo = new IES.CC.Model.Survey.SurveyInfo();
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    var multi = conn.QueryMultiple("SurveyInfo_Get", p, commandType: CommandType.StoredProcedure);
                    var survey = multi.Read<IES.CC.Model.Survey.Survey>().Single();
                    var sobject = multi.Read<IES.CC.Model.Survey.Surveyobject>().ToList();
                    var question = multi.Read<IES.CC.Model.Survey.SurveyQuestion>().ToList();
                    var questionitem = multi.Read<IES.CC.Model.Survey.SurveyQuestionitem>().ToList();
                    SuInfo.survey = survey;
                    SuInfo.sobject = sobject;
                    SuInfo.question = question;
                    SuInfo.questionitem = questionitem;
                    return SuInfo;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 获取调查题目的详细信息（题目+选项）
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static IES.CC.Model.Survey.SurveyInfo SurveyQuestionInfo_Get(IES.CC.Model.Survey.SurveyQuestion model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    IES.CC.Model.Survey.SurveyInfo SuInfo = new IES.CC.Model.Survey.SurveyInfo();
                    var p = new DynamicParameters();
                    p.Add("@QuestionID", model.QuestionID);
                    var multi = conn.QueryMultiple("SurveyQuestionInfo_Get", p, commandType: CommandType.StoredProcedure);
                    var question = multi.Read<IES.CC.Model.Survey.SurveyQuestion>().ToList();
                    var questionitem = multi.Read<IES.CC.Model.Survey.SurveyQuestionitem>().ToList();
                    SuInfo.question = question;
                    SuInfo.questionitem = questionitem;
                    return SuInfo;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 获取调查问卷指定问题的统计信息
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Survey.SurveyQuestion> SurveyAnswer_Statistics(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    IES.CC.Model.Survey.SurveyInfo SuInfo = new IES.CC.Model.Survey.SurveyInfo();
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@QuestionID", model.QuestionID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@ObjectID", model.ObjectID);
                    return conn.Query<IES.CC.Model.Survey.SurveyQuestion>("SurveyAnswer_Statistics", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 获取调查问卷的答案详细信息
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Survey.SurveyAnswer> SurveyAnswer_Get(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    IES.CC.Model.Survey.SurveyInfo SuInfo = new IES.CC.Model.Survey.SurveyInfo();
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@QuestionID", model.QuestionID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@ObjectID", model.ObjectID);
                    return conn.Query<IES.CC.Model.Survey.SurveyAnswer>("SurveyAnswer_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 问卷调查 单选题、多选题、打分题（含矩阵）答案统计
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Survey.SurveyQuestion> SurveyAnswer_All_Get(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    IES.CC.Model.Survey.SurveyInfo SuInfo = new IES.CC.Model.Survey.SurveyInfo();
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@ObjectID", model.ObjectID);
                    return conn.Query<IES.CC.Model.Survey.SurveyQuestion>("SurveyAnswer_All_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 获取调查问卷的被评价对象
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Survey.SurveyToObject> SurveyToObject_Get(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@UserID", model.UserID);
                    return conn.Query<IES.CC.Model.Survey.SurveyToObject>("SurveyToObject_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 获取调查问卷的被评价对象&创建者
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<IES.JW.Model.User> SurveyToObject_My_Get(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@UserID", model.UserID);
                    return conn.Query<IES.JW.Model.User>("SurveyToObject_My_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// 问卷是否已经提交投票
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static IES.CC.Model.Survey.SurveyUser Survey_Is_Sumbit(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@UserID", model.UserID);
                    return conn.Query<IES.CC.Model.Survey.SurveyUser>("Survey_Is_Sumbit", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region 删除
        /// <summary>
        /// 删除调查问卷
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static bool Survey_Del(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    conn.Execute("Survey_Del", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion

        #region  编辑
        /// <summary>
        /// 创建调查问卷
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static IES.CC.Model.Survey.Survey Survey_ADD(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    p.Add("@OCID", model.OCID);
                    p.Add("@CourseID", model.CourseID);
                    p.Add("@Title", model.Title);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    p.Add("@CreateUserID", model.CreateUserID);
                    p.Add("@OwnerUserID", model.OwnerUserID);
                    p.Add("@Brief", model.Brief);
                    p.Add("@RegNum", model.RegNum);
                    p.Add("@EvaluationMode", model.EvaluationMode);
                    p.Add("@Source", model.Source);
                    p.Add("@SourceID", model.SourceID);
                    p.Add("@IsTemplate", model.IsTemplate);
                    //p.Add("@output", "", dbType: DbType.String, direction: ParameterDirection.Output);
                    conn.Execute("Survey_ADD", p, commandType: CommandType.StoredProcedure);
                    model.SurveyID = p.Get<Int32>("SurveyID");
                    return model;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        /// <summary>
        /// 创建调查问卷
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static bool Survey_Edit(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@Title", model.Title);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    p.Add("@Brief", model.Brief);
                    p.Add("@EvaluationMode", model.EvaluationMode);
                    p.Add("@IsTemplate", model.IsTemplate);
                    conn.Execute("Survey_Edit", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        /// <summary>
        /// 修改问卷调查结果公开状态
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static bool Survey_IsOpen_Upd(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    conn.Execute("Survey_IsOpen_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        /// <summary>
        /// 更新问卷的状态
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static bool Survey_Status_Upd(IES.CC.Model.Survey.Survey model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@Status", model.Status);
                    conn.Execute("Survey_Status_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        /// <summary>
        /// 问卷调查投票
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static bool SurveyAnswer_Edit(IES.CC.Model.Survey.SurveyAnswer model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@AnswerID", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@Conten", model.Conten);
                    p.Add("@Status", model.Status);
                    p.Add("@ObjectID", model.ObjectID);
                    conn.Execute("SurveyAnswer_Edit", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        /// <summary>
        /// 对评价对象的评价是否完成更改
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static bool SurveyToObject_IsFinish_Upd(IES.CC.Model.Survey.SurveyAnswer model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@ObjectID", model.ObjectID);
                    p.Add("@IsFinish", model.IsFinish);
                    conn.Execute("SurveyToObject_IsFinish_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion
    }
}
