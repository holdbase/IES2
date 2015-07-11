using IES.CC.OC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IES.Service;
using IES.CC.Model.PBL;
using IES.CC.Model.Test;
using System.Web.SessionState;

namespace App.G2S.DataProvider.User
{
    /// <summary>
    /// Account 的摘要说明
    /// </summary>
    public class Account : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.AddHeader("Cache-Control", "no-cache,must-revalidate");
            string action = context.Request["action"];
            if (!string.IsNullOrEmpty(action)) this.GetType().GetMethod(action).Invoke(this, new object[] { context });
            context.Response.End();
        }
        /// <summary>
        /// 保存个人信息
        /// </summary>
        /// <param name="context"></param>
        public void SavaInf(HttpContext context)
        {
            IES.JW.Model.User _user = new IES.JW.Model.User
            {
                UserID = UserService.CurrentUser.UserID,
                UserNo = context.Request["UserNo"],
                UserName = context.Request["UserName"],
                UserNameEn = context.Request["UserNameEn"],
                Nickname = context.Request["Nickname"],
                Gender = Convert.ToInt32(context.Request["Gender"]),
                OrganizationID = Convert.ToInt32(context.Request["OrganizationID"]),
                Email = context.Request["Email"],
                Tel = context.Request["Tel"],
                Mobile = context.Request["Mobile"],
                Brief = context.Request["Brief"]
            };
            IES.G2S.JW.BLL.UserBLL userbll = new IES.G2S.JW.BLL.UserBLL();
            IES.JW.Model.User flag = userbll.User_Part_Upd(_user);
            if (flag != null)
            {
                if (flag.output == "教工号或学号已经存在，请重新设置教工号或学号")
                {
                    context.Response.Write("2");
                }
                else
                {
                    context.Response.Write("1");
                }
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        /// 手机是否已经被绑定验证
        /// </summary>
        /// <param name="context"></param>
        public void Mobile_Validation(HttpContext context)
        {
            IES.JW.Model.User _user = new IES.JW.Model.User
            {
                Mobile = context.Request["Mobile"]
            };
            IES.G2S.JW.BLL.UserBLL userbll = new IES.G2S.JW.BLL.UserBLL();
            bool flag = userbll.Mobile_Validation(_user);
            if (flag == true)
            {
                context.Response.Write("1");
            }
            else if (flag == false)
            {
                context.Response.Write("2");
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        /// 邮箱是否已经被绑定验证
        /// </summary>
        /// <param name="context"></param>
        public void Email_Validation(HttpContext context)
        {
            IES.JW.Model.User _user = new IES.JW.Model.User
            {
                Email = context.Request["Email"]
            };
            IES.G2S.JW.BLL.UserBLL userbll = new IES.G2S.JW.BLL.UserBLL();
            bool flag = userbll.Email_Validation(_user);
            if (flag == true)
            {
                context.Response.Write("1");
            }
            else if (flag == false)
            {
                context.Response.Write("2");
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        /// 账号安全
        /// </summary>
        public void Email_Upd(HttpContext context)
        {
            IES.JW.Model.User _user = new IES.JW.Model.User
            {
                UserID=Convert.ToInt32(context.Request["UserID"]),
                Email = context.Request["Email"]
            };
            IES.G2S.JW.BLL.UserBLL userbll = new IES.G2S.JW.BLL.UserBLL();
            bool flag = userbll.Email_Upd(_user);
            if (flag == true)
            {
                context.Response.Write("1");
            }
            else
            {
                context.Response.Write("False");
            }
        }
        public void Pwd_Upd(HttpContext context)
        {
            IES.JW.Model.User _user = new IES.JW.Model.User
            {
                UserID = Convert.ToInt32(context.Request["UserID"]),
                Pwd = context.Request["Pwd"]
            };
            IES.G2S.JW.BLL.UserBLL userbll = new IES.G2S.JW.BLL.UserBLL();
            bool flag = userbll.Pwd_Upd(_user);
            if (flag == true)
            {
                context.Response.Write("1");
            }
            else
            {
                context.Response.Write("False");
            }
        }
        public void Mobile_Upd(HttpContext context)
        {
            IES.JW.Model.User _user = new IES.JW.Model.User
            {
                UserID = Convert.ToInt32(context.Request["UserID"]),
                Mobile = context.Request["Mobile"]
            };
            IES.G2S.JW.BLL.UserBLL userbll = new IES.G2S.JW.BLL.UserBLL();
            bool flag = userbll.Mobile_Upd(_user);
            if (flag == true)
            {
                context.Response.Write("1");
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        /// 获取用户的在线课程及其下的班级树
        /// </summary>
        /// <param name="context"></param>
        public void OCClass_UserID_Tree(HttpContext context)
        {
            OCTeamClass model = new OCTeamClass
            {
                UserID = UserService.CurrentUser.UserID
            };
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL mygroupbll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            List<OCTeamClass> list = mygroupbll.OCClass_UserID_Tree(model);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        /// 获取用户或班级下的教师或学生
        /// </summary>
        /// <param name="context"></param>
        public void ClassUser_List(HttpContext context)
        {
            OCTeamClass model = new OCTeamClass
            {
                Key =context.Request["Key"],
                UserID = UserService.CurrentUser.UserID,
                OCClassID = Convert.ToInt32(context.Request["OCClassID"]),
                UserType = Convert.ToInt32(context.Request["UserType"]),
                GroupID = Convert.ToInt32(context.Request["GroupID"])
            };
            int PageIndex=Convert.ToInt32(context.Request["PageIndex"]);
            int PageSize = Convert.ToInt32(context.Request["PageSize"]);
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL mygroupbll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            List<IES.JW.Model.User> list = mygroupbll.ClassUser_List(model,PageIndex,PageSize);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        /// 根据用户编号集合获取用户信息
        /// </summary>
        /// <param name="context"></param>
        public void User_ByUserIDs_List(HttpContext context)
        {
            IES.JW.Model.User model = new IES.JW.Model.User
            {
                UserIDS = context.Request["UserIDS"]
            };
            IES.G2S.JW.BLL.UserBLL userbll = new IES.G2S.JW.BLL.UserBLL();
            List<IES.JW.Model.User> list = userbll.User_ByUserIDs_List(model);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        /// 新增或修改我的联系组 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public void MyGroup_Edit(HttpContext context)
        {
            Group model = new Group
            {
                GroupID = Convert.ToInt32(context.Request["GroupID"]),
                Name = context.Request["Name"],
                User = UserService.CurrentUser.UserID,
                Users = context.Request["Users"]
            };
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL bll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            bool flag = bll.MyGroup_Edit(model);
            if (flag == true)
            {
                context.Response.Write("1");
            }
            else
            {
                context.Response.Write("False");
            }
        }

        /// <summary>
        /// 获取我的联系组列表 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public void MyGroup_List(HttpContext context)
        {
            MyGroup model = new MyGroup
            {
                UserID=UserService.CurrentUser.UserID,
                Key = context.Request["Key"]
            };
            int PageIndex = Convert.ToInt32(context.Request["PageIndex"]);
            int PageSize = Convert.ToInt32(context.Request["PageSize"]);
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL bll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            List<MyGroup> list = bll.MyGroup_List(model, PageIndex, PageSize);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        /// 获得我的联系组下的联系人 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public void MyGroupUser_List(HttpContext context)
        {
            MyGroupUser model = new MyGroupUser
            {
                GroupID = Convert.ToInt32(context.Request["GroupID"]),
                UserType = Convert.ToInt32(context.Request["UserType"])
            };
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL bll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            List<MyGroupUser> list = bll.MyGroupUser_List(model);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        ///  删除我的联系组 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public void MyGroup_Del(HttpContext context)
        {
            Group model = new Group
            {
                GroupID = Convert.ToInt32(context.Request["GroupID"])
            };
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL bll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            bool flag = bll.MyGroup_Del(model);
            if (flag == true)
            {
                context.Response.Write("1");
            }
            else if (flag == false)
            {
                context.Response.Write("2");
            }
        }
        /// <summary>
        ///  获取历史班级下的学生 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public void ClassUserHistory_List(HttpContext context)
        {
            IES.JW.Model.TeachingClass model = new IES.JW.Model.TeachingClass
            {
                TeachingClassID = Convert.ToInt32(context.Request["TeachingClassID"]),
                Key = context.Request["Key"]
            };
            int PageIndex = Convert.ToInt32(context.Request["PageIndex"]);
            int PageSize = Convert.ToInt32(context.Request["PageSize"]);
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL bll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            List<IES.JW.Model.User> list = bll.ClassUserHistory_List(model, PageIndex, PageSize);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        ///  学期列表
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public void Term_List(HttpContext context)
        {
            IES.JW.Model.Term model = new IES.JW.Model.Term { Key = "" };
            IES.G2S.JW.BLL.TermBLL termbll = new IES.G2S.JW.BLL.TermBLL();
            List<IES.JW.Model.Term> list = termbll.Term_List(model);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        ///  通过学期ID获得教学班列表
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public void TeachingClass_ByTermID_List(HttpContext context)
        {
            IES.JW.Model.Term model = new IES.JW.Model.Term { TermID = Convert.ToInt32(context.Request["TermID"]) };
            IES.G2S.JW.BLL.TeachingClassBLL teachclassbll = new IES.G2S.JW.BLL.TeachingClassBLL();
            List<IES.JW.Model.TeachingClass> list = teachclassbll.TeachingClass_ByTermID_List(model);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }
        /// <summary>
        ///  传发送人集合 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public void SendUserIDS(HttpContext context)
        {
            string UserIDS = context.Request["UserIDS"];
            context.Session["SendUserIDs"] = UserIDS;
            context.Response.Write("1");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}