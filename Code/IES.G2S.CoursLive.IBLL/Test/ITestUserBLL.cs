using IES.CC.Test.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CoursLive.IBLL.Test
{
    /// <summary>
    /// 学生作业
    /// </summary>
    public interface ITestUserBLL
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
        List<TestUser> TestUser_List(TestUser model, string SearchKey, int PageIndex, int PageSize);
        #endregion

        #region 属性更新

        #region 设置/取消范本作业
        /// <summary>
        /// 设置/取消范本作业
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <returns></returns>
        bool TestUser_IsSample_Upd(int UserID, int TestID);

        #endregion
        /// <summary>
        /// 重做
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        bool TestUser_Status_Upd(int UserID, int TestID, int Status, int LoginUserID);

        /// <summary>
        /// 发放成绩
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <returns></returns>
        bool Test_ScoreSend(int UserID, int TestID, int LoginUserID);
        #endregion
    }
}
