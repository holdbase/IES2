using IES.CC.OC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.DataBase;
using Dapper;
using System.Data;
using IES.Resource.Model;

namespace IES.G2S.CourseLive.DAL.OC
{
    /// <summary>
    /// xuwei
    /// 2015年1月10日11:53:37
    /// 
    /// </summary>
    public class OCClassDAL
    {
        #region 列表
        /// <summary>
        /// 网络教学班下拉列表
        /// 2015年1月10日11:55:42
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        public static List<OCClass> OCClass_Dropdown_List(int OCID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    return conn.Query<OCClass>("OCClass_Dropdown_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        /// <summary>
        /// 获取用户相关本次测试相关教学班下拉列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static List<OCClass> TeachingClass_TestID_Owner_List(int OCID,int TestID,int UserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@TestID", TestID);
                    p.Add("@UserID", UserID);
                    return conn.Query<OCClass>("TeachingClass_TestID_Owner_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        /// <summary>
        /// 获取教学班学生
        /// </summary>
        /// <param name="TeachingClassID">教学班id</param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<OCClassStudent> TeachingClassStudent_List(int TeachingClassID, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.JWService())
                {
                    List<OCClassStudent> ul = new List<OCClassStudent>();
                    var p = new DynamicParameters();
                    p.Add("@TeachingClassID", TeachingClassID);
                    p.Add("@PageSize", PageSize);
                    p.Add("@PageIndex", PageIndex);
                    ul = conn.Query<OCClassStudent>("TeachingClassStudent_List", p, commandType: CommandType.StoredProcedure).ToList();
                    return ul;

                }
            }
            catch
            {
                return null;
            }
        }
        #endregion

        #region 移动端
        public static List<Chapter> App_Chapter_Zhang_List(int OCID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    return conn.Query<Chapter>("App_Chapter_Zhang_List", p, commandType: CommandType.StoredProcedure).ToList();
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
