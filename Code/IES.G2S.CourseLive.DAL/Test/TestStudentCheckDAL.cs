using IES.CC.Model.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IES.DataBase;
using System.Data;

namespace IES.G2S.CourseLive.DAL.Test
{
    public class TestStudentCheckDAL
    {
        /// <summary>
        /// 获取某学生 评价的学生列表  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<TestStudentCheck> TestStudentCheck_UserID_List(TestStudentCheck model,int UserID)
        {
            try
            {
                using (var conn=DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", model.TestID);
                    p.Add("@StudentUserID", model.UserID);
                    p.Add("@LoginUserID",UserID );
                    return conn.Query<TestStudentCheck>("TestStudentCheck_UserID_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
