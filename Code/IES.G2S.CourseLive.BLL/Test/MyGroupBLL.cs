using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.G2S.CourseLive;
using IES.CC.OC.Model;
using IES.JW.Model;
using IES.G2S.CourseLive.DAL.Test;
using IES.CC.Model.PBL;
using IES.CC.Model.Test;

namespace IES.G2S.CourseLive.BLL.Test
{
    public class MyGroupBLL
    {
        public List<OCTeamClass> OCClass_UserID_Tree(OCTeamClass model)
        {
            return MyGroupDAL.OCClass_UserID_Tree(model);
        }
        public List<User> ClassUser_List(OCTeamClass model, int PageIndex, int PageSize)
        {
            return MyGroupDAL.ClassUser_List(model,PageIndex,PageSize);
        }

        public bool MyGroup_Del(Group model)
        {
            return MyGroupDAL.MyGroup_Del(model);
        }
        public bool MyGroup_Edit(Group model)
        {
            return MyGroupDAL.MyGroup_Edit(model);
        }
        public List<MyGroupUser> MyGroupUser_List(MyGroupUser model)
        {
            return MyGroupDAL.MyGroupUser_List(model);
        }
        public List<User> MyGroupUsers_GroupIDs_Get(MyGroupUser model)
        {
            return MyGroupDAL.MyGroupUsers_GroupIDs_Get(model);
        }

        //联系组列表
        public List<MyGroup> MyGroup_List(MyGroup model, int PageIndex, int PageSize)
        {
            return MyGroupDAL.MyGroup_List(model, PageIndex, PageSize);
        }
        //获取历史班级下的学生
        public List<User> ClassUserHistory_List(TeachingClass model, int PageIndex, int PageSize)
        {
            return MyGroupDAL.ClassUserHistory_List(model, PageIndex, PageSize);
        }

        #region 移动端
        public List<IES.CC.OC.Model.OC> App_OCClass_List(int UserID)
        {
            return MyGroupDAL.App_OCClass_List(UserID);
        }
        public List<User> App_ClassUser_List(int UserID, int ID, int Type)
        {
            return MyGroupDAL.App_ClassUser_List(UserID,ID,Type);
        }
        #endregion
    }
}
