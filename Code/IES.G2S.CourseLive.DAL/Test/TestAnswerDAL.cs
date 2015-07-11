using IES.CC.Test.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.DataBase;
using Dapper;
using System.Data;

namespace IES.G2S.CourseLive.DAL.Test
{
    public class TestAnswerDAL
    {
        /// <summary>
        /// 错题排行榜
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="TopNum"></param>
        /// <returns></returns>
        public static List<TestAnswer> Test_Exercise_ErrorRank_List(int TestID, int TopNum)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("TestID", TestID);
                    p.Add("TopNum", TopNum);
                    return conn.Query<TestAnswer>("Test_Exercise_ErrorRank_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception)
            {
                return new List<TestAnswer>();
            }
        }
    }
}
