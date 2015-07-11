using IES.CC.OC.Model;
using IES.G2S.CourseLive.DAL.OC;
using IES.Resource.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.OC
{
    /// <summary>
    /// 网络教学班
    /// </summary>
    public class OCClassBLL
    {
        #region 列表
        /// <summary>
        /// 网络教学班下拉列表
        /// 2015年1月10日11:55:42
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        public List<OCClass> OCClass_Dropdown_List(int OCID)
        {
            return OCClassDAL.OCClass_Dropdown_List(OCID);
        }

        /// <summary>
        /// 获取用户相关本次测试相关教学班下拉列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public List<OCClass> TeachingClass_TestID_Owner_List(int OCID, int TestID, int UserID)
        {
            return OCClassDAL.TeachingClass_TestID_Owner_List(OCID, TestID, UserID);
        }

        /// <summary>
        /// 获取教学班学生
        /// </summary>
        /// <param name="TeachingClassID">教学班id</param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public List<OCClassStudent> TeachingClassStudent_List(int TeachingClassID, int PageIndex, int PageSize)
        {
            return OCClassDAL.TeachingClassStudent_List(TeachingClassID, PageIndex, PageSize);
        }
        #endregion

        #region 移动端
        public List<Chapter> App_Chapter_Zhang_List(int OCID)
        {
            return OCClassDAL.App_Chapter_Zhang_List(OCID);
        }
        #endregion
    }
}
