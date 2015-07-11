using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IES.DataBase;
using System.Data;
using IES.CC.Model.Survey;

namespace IES.G2S.CourseLive.DAL.Survey
{
    /// <summary>
    /// 调查问题
    /// </summary>
    public class SurveyQuestionDAL
    {
        #region 编辑
        public static SurveyQuestion SurveyQuestion_Edit(SurveyQuestion model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                   p.Add("@QuestionID", model.QuestionID);
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@Type", model.Type);
                    p.Add("@Conten", model.Conten);
                    p.Add("@IsMust", model.IsMust);
                    p.Add("@IsRandom", model.IsRandom);
                    p.Add("@MinSel", model.MinSel);
                    p.Add("@MaxSel", model.MaxSel);
                    p.Add("@UserID", model.UserID);
                    p.Add("@IsSample", model.IsSample);
                    p.Add("@ChoiceItems", model.ChoiceItems);
                    p.Add("@ChildQuestions", model.ChildQuestions);
                    p.Add("@Orde",model.Orde);
                    conn.Execute("SurveyQuestion_Edit", p, commandType: CommandType.StoredProcedure);
                    //model.QuestionID = p.Get<Int32>("QuestionID");
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
        public static bool SurveyQuestion_Del(int SurveyID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", SurveyID);
                    conn.Execute("SurveyQuestion_Del", p, commandType: CommandType.StoredProcedure);
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
