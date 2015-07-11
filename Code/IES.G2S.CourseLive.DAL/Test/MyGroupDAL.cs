using IES.CC.OC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IES.DataBase;
using System.Data;
using IES.JW.Model;
using IES.CC.Model.PBL;
using IES.CC.Model.Test;

namespace IES.G2S.CourseLive.DAL.Test
{
    public class MyGroupDAL
    {
        /// <summary>
        /// 获取用户的在线课程及其下的班级树
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<OCTeamClass> OCClass_UserID_Tree(OCTeamClass model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", model.UserID);
                    return conn.Query<OCTeamClass>("OCClass_UserID_Tree", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return new List<OCTeamClass>();
            }
        }
        /// <summary>
        /// 获取用户或班级下的教师或学生（通讯录）
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<User> ClassUser_List(OCTeamClass model, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@Key", model.Key);
                    p.Add("@UserID", model.UserID);
                    p.Add("@OCClassID", model.@OCClassID);
                    p.Add("@UserType", model.UserType);
                    p.Add("@GroupID", model.GroupID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<User>("ClassUser_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return new List<User>();
            }
        }
        /// <summary>
        /// 删除我的联系组 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static bool MyGroup_Del(Group model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@GroupID", model.GroupID);
                    conn.Execute("MyGroup_Del", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        /// <summary>
        /// 新增或修改我的联系组 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static bool MyGroup_Edit(Group model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@GroupID", model.GroupID);
                    p.Add("@GroupName", model.Name);
                    p.Add("@User", model.User);
                    p.Add("@Users", model.Users);
                    conn.Execute("MyGroup_Edit", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        /// <summary>
        /// 获得我的联系组下的联系人 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<MyGroupUser> MyGroupUser_List(MyGroupUser model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@GroupID", model.GroupID);
                    p.Add("@UserType", model.UserType);
                    p.Add("@PageIndex", 1);
                    p.Add("@PageSize", 10000);
                    return conn.Query<MyGroupUser>("MyGroupUser_List", p, commandType: CommandType.StoredProcedure).ToList();              
                }
            }
            catch (Exception e)
            {
                return new List<MyGroupUser>();
            }
        }
        /// <summary>
        /// 获取我的联系组下的用户编号表 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<User> MyGroupUsers_GroupIDs_Get(MyGroupUser model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@GroupIDs", model.GroupIDs);
                    return conn.Query<User>("MyGroupUsers_GroupIDs_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return new List<User>();
            }
        }

        //联系组列表
        public static List<MyGroup> MyGroup_List(MyGroup model, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@Key", model.Key);
                    p.Add("@UserID", model.UserID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<MyGroup>("MyGroup_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return new List<MyGroup>();
            }
        }
        //获取历史班级下的学生
        public static List<User> ClassUserHistory_List(TeachingClass model, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@Key", model.Key);
                    p.Add("@TeachingClassID", model.TeachingClassID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<User>("ClassUserHistory_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return new List<User>();
            }
        }

        #region 移动端
        public static List<IES.CC.OC.Model.OC> App_OCClass_List(int UserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", UserID);
                    return conn.Query<IES.CC.OC.Model.OC>("App_OCClass_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public static List<User> App_ClassUser_List(int UserID, int ID, int Type)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", UserID);
                    p.Add("@ID", ID);
                    p.Add("@Type", Type);
                    return conn.Query<User>("App_ClassUser_List", p, commandType: CommandType.StoredProcedure).ToList();
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
