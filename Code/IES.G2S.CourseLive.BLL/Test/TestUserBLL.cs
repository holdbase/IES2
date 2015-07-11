using IES.G2S.CourseLive.DAL.Test;
using IES.G2S.CoursLive.IBLL.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Test
{
    public class TestUserBLL : ITestUserBLL
    {
        #region 列表
        /// <summary>
        /// 学生作业详细列表
        /// </summary>
        /// <param name="model"></param>
        /// <param name="SearchKey"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public List<CC.Test.Model.TestUser> TestUser_List(CC.Test.Model.TestUser model, string SearchKey, int PageIndex, int PageSize)
        {
            return TestUserDAL.TestUser_List(model, SearchKey, PageIndex, PageSize);
        }
        #endregion

        #region 属性更新
        /// <summary>
        /// 设置/取消范本作业
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <returns></returns>
        public bool TestUser_IsSample_Upd(int UserID, int TestID)
        {
            return TestUserDAL.TestUser_IsSample_Upd(UserID, TestID);
        }

        /// <summary>
        /// 重做
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        public bool TestUser_Status_Upd(int UserID, int TestID, int Status, int LoginUserID)
        {
            return TestUserDAL.TestUser_Status_Upd(UserID, TestID, Status, LoginUserID);
        }

        /// <summary>
        /// 发放成绩
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <returns></returns>
        public bool Test_ScoreSend(int UserID, int TestID, int LoginUserID)
        {
            return TestUserDAL.Test_ScoreSend(UserID, TestID, LoginUserID);
        }
        #endregion

        /// <summary>
        /// 学生测试智能选题(针对某测试)    
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public bool TestTacticExercise_Add(int TestID, int UserID)
        {
            return TestUserDAL.TestTacticExercise_Add(TestID, UserID);
        }
    }
}
