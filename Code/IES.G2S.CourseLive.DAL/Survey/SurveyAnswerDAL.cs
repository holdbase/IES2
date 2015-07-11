using IES.CC.Model.Survey;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IES.DataBase;
using System.Data;

namespace IES.G2S.CourseLive.DAL.Survey
{
    /// <summary>
    /// 问卷调查答案
    /// </summary>
    public class SurveyAnswerDAL
    {
        #region 编辑
        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static SurveyAnswer SurveyAnswer_Edit(SurveyAnswer model)
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
                    conn.Execute("SurveyAnswer_Edit", p, commandType: CommandType.StoredProcedure);
                    model.AnswerID = p.Get<Int32>("AnswerID");
                    return model;
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
        /// 删除
        /// </summary>
        /// <param name="QuestionID"></param>
        /// <returns></returns>

        public static bool SurveyAnswer_Del(int QuestionID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@QuestionID", QuestionID);
                    conn.Execute("SurveyAnswer_Edit", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion

        #region 详细信息
        /// <summary>
        /// 详细信息
        /// </summary>
        /// <returns></returns>
        public static SurveyAnswer SurveyAnswer_Get(SurveyAnswer model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@QuestionID", model.QuestionID);
                    p.Add("@UserID", model.UserID);
                    conn.Execute("SurveyAnswer_Edit", p, commandType: CommandType.StoredProcedure);
                    return model;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        } 
        #endregion

        #region 列表
        /// <summary>
        /// 获取调查问卷指定问题的答案汇总信息 ，
        /// 针对无法统计的题型，只能列出所有答案
        /// </summary>
        /// <param name="SurveyID"></param>
        /// <param name="QuestionID"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<SurveyAnswer> SurveyAnswer_List(int SurveyID, int QuestionID, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", SurveyID);
                    p.Add("@QuestionID", QuestionID);
                    return conn.Query<SurveyAnswer>("SurveyAnswer_Edit", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        } 
        #endregion

    }
}
