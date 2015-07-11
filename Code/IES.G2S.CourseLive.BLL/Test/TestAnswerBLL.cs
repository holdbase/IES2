using IES.CC.Test.Model;
using IES.G2S.CourseLive.DAL.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Test
{
    public class TestAnswerBLL
    {
        public List<TestAnswer> Test_Exercise_ErrorRank_List(int TestID, int TopNum)
        {
            return TestAnswerDAL.Test_Exercise_ErrorRank_List(TestID, TopNum);
        }

    }
}
