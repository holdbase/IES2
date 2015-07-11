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
    /// 调查对象
    /// </summary>
    public class SurveyobjectDAL
    {

        #region 编辑
        /// <summary>
        /// 编辑调查对象
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static bool Surveyobject_Edit(Surveyobject model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", model.SurveyID);
                    p.Add("@Source", model.Source);
                    p.Add("@SourceIDs", model.SourceIDs);
                    //p.Add("@IDS", model.IDS);
                    conn.Execute("Surveyobject_Edit", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion


        /// <summary>
        /// 获取参与对象
        /// </summary>
        /// <param name="SurveyID"></param>
        /// <param name="Source"></param>
        /// <returns></returns>
        public static List<Surveyobject> Surveyobject_Get(int SurveyID, string Source)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SurveyID", SurveyID);
                    p.Add("@Source", Source);
                    return conn.Query<Surveyobject>("Surveyobject_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
