using IES.CC.Model.Test;
using IES.G2S.CourseLive.DAL.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Test
{
    public class TestStudentCheckBLL
    {
        /// <summary>
        /// 获取某学生 评价的学生列表  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public List<TestStudentCheck> TestStudentCheck_UserID_List(TestStudentCheck model, int UserID)
        {
            return TestStudentCheckDAL.TestStudentCheck_UserID_List(model, UserID);
        }
    }
}
