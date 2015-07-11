using IES.CC.Model.Score;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.DataBase;
using Dapper;
using System.Data;

namespace IES.G2S.CourseLive.DAL.Score
{
    /// <summary>
    /// 徐卫
    /// 成绩类别加权
    /// </summary>
    public class ScoreWeightDAL
    {
        #region 列表
        /// <summary>
        /// 成绩权重类别列表
        /// </summary>
        /// <param name="teachingClassID"></param>
        /// <returns></returns>
        public static List<ScoreWeight> ScoreWeight_List(int OCID, int WeightID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@WeightID", WeightID);
                    return conn.Query<ScoreWeight>("ScoreWeightDetail_List", p, commandType: CommandType.StoredProcedure).ToList(); ;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region 属性更新
        /// <summary>
        /// 更改成绩类别的权重
        /// </summary>
        /// <param name="weightID"></param>
        /// <returns></returns>
        public static bool ScoreWeightDetail_Upd(ScoreWeight sw)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@WeightID", sw.WeightID);
                    p.Add("@OCID", sw.OCID);
                    p.Add("@ScoreTypeID", sw.ScoreTypeID);
                    p.Add("@JoinNum", sw.JoinNum);
                    p.Add("@Power", sw.Power);
                    conn.Execute("ScoreWeightDetail_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// 成绩权重类别列表
        /// </summary>
        /// <param name="teachingClassID"></param>
        /// <returns></returns>
        public static ScoreWeight ScoreWeight_Add(ScoreWeight model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@WeightID", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    p.Add("@OCID", model.OCID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@UserName", model.UserName);
                    p.Add("@OCClassID", model.OCClassID);
                    conn.Execute("ScoreWeight_Add", p, commandType: CommandType.StoredProcedure);
                    model.WeightID = p.Get<int>("WeightID");
                    return model;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool Score_Result_Auto(int OCClassID, int UserID, int OCID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCClassID", OCClassID);
                    p.Add("@UserID", UserID);
                    p.Add("@OCID", OCID);
                    conn.Execute("Score_Result_Auto", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

    }
}
