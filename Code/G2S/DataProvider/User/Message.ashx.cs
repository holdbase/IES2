using IES.CC.Model.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IES.Service;
using IES.CC.OC.Model;
using IES.CC.Model.PBL;

namespace App.G2S.DataProvider.User
{
    /// <summary>
    /// Message 的摘要说明
    /// </summary>
    public class Message : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"];
            if (!string.IsNullOrEmpty(action))
            {
                try
                {
                    System.Reflection.MethodInfo method = this.GetType().GetMethod(action);
                    method.Invoke(this, new object[] { context });
                }
                catch (Exception ex)
                {
                    context.Response.Write("False");
                    context.Response.End();
                }
            }
        }

        //获取我的消息列表
        public void GetMsgList(HttpContext context)
        {
            string Key = context.Request["Key"];
            int UserID = UserService.CurrentUser.UserID;
            int Type = Convert.ToInt32(context.Request["Type"]);
            int PageIndex = Convert.ToInt32(context.Request["PageIndex"]);
            int PageSize = Convert.ToInt32(context.Request["PageSize"]);
            IES.CC.Model.Test.Message message = new IES.CC.Model.Test.Message { Key = Key, UserID = UserID, Type = Type };
            IES.G2S.CourseLive.BLL.Test.MessageBLL messagebll = new IES.G2S.CourseLive.BLL.Test.MessageBLL();
            List<IES.CC.Model.Test.Message> mess_ = messagebll.Message_List(message, PageIndex, PageSize);
            if (mess_ != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(mess_));
            }
            else
            {
                context.Response.Write("False");
            }
        }

        //删除信息
        public void MessageDel(HttpContext context)
        {
            int UserID = UserService.CurrentUser.UserID;
            int Type = Convert.ToInt32(context.Request["Type"]);
            var IdS = context.Request["MessageIDs"];
            IES.CC.Model.Test.Message message = new IES.CC.Model.Test.Message { UserID = UserID, Type = Type, MessageIDs = IdS };
            IES.G2S.CourseLive.BLL.Test.MessageBLL messagebll = new IES.G2S.CourseLive.BLL.Test.MessageBLL();
            bool Judge = messagebll.Message_Del(message);
            if (Judge == true)
            {
                context.Response.Write("true");
            }
            else
            {
                context.Response.Write("False");
            }
        }

        //发送消息
        public void MessageAdd(HttpContext context)
        {
            bool IsForMail;
            bool IsForSMS;
            int MessageID = 0;
            var Title = context.Request["Title"];
            var Conten = context.Request["Conten"];
            int SendUserID = UserService.CurrentUser.UserID;
            int True = Convert.ToInt32(context.Request["IsForMail"]);
            if (True == 1)
            {
                IsForMail = true;
            }
            else
            {
                IsForMail = false;
            }
            int False = Convert.ToInt32(context.Request["IsForSMS"]);
            if (False == 1)
            {
                IsForSMS = true;
            }
            else
            {
                IsForSMS = false;
            }
            var ReceiveUserIDs = context.Request["ReceiveUserIDs"];
            IES.CC.Model.Test.Message message = new IES.CC.Model.Test.Message { MessageID = MessageID, Title = Title, Conten = Conten, SendUserID = SendUserID, IsForMail = IsForMail, IsForSMS = IsForSMS, ReceiveUserIDs = ReceiveUserIDs };
            IES.G2S.CourseLive.BLL.Test.MessageBLL messagebll = new IES.G2S.CourseLive.BLL.Test.MessageBLL();
            IES.CC.Model.Test.Message _message = messagebll.Message_Add(message);
            if (_message != null)
            {
                context.Response.Write("true");
            }
            else
            {
                context.Response.Write("False");
            }

        }

        //班级树
        public void OCClasList(HttpContext context)
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

        // 获取用户或班级下的教师或学生
        public void ClassUser_List(HttpContext context)
        {
            OCTeamClass model = new OCTeamClass
            {
                Key = context.Request["Key"],
                UserID = UserService.CurrentUser.UserID,
                OCClassID = Convert.ToInt32(context.Request["OCClassID"]),
                UserType = Convert.ToInt32(context.Request["UserRole"]),
                GroupID = Convert.ToInt32(context.Request["GroupID"])
            };
            int PageIndex = Convert.ToInt32(context.Request["PageIndex"]);
            int PageSize = Convert.ToInt32(context.Request["PageSize"]);
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL mygroupbll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            List<IES.JW.Model.User> list = mygroupbll.ClassUser_List(model, PageIndex, PageSize);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }

        //联系组树
        public void ContactzTreeList(HttpContext context)
        {
            MyGroup model = new MyGroup
            {
                Key="",
                UserID = UserService.CurrentUser.UserID,                
            };
            int PageIndex = Convert.ToInt32(context.Request["PageIndex"]);
            int PageSize = Convert.ToInt32(context.Request["PageSize"]);
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL mygroupbll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            List<MyGroup> list = mygroupbll.MyGroup_List(model,PageIndex,PageSize);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }

        //根据信息ID获取姓名,ID
        public void User_NameID_List(HttpContext context) {
            int UserID = UserService.CurrentUser.UserID;
            int MessageID = Convert.ToInt32(context.Request["UserIDS"]);
            IES.CC.Model.Test.Message message = new IES.CC.Model.Test.Message { MessageID = MessageID, UserID = UserID };
            IES.G2S.CourseLive.BLL.Test.MessageBLL messagebll = new IES.G2S.CourseLive.BLL.Test.MessageBLL();
            List<IES.CC.Model.Test.Message> _mess = messagebll.Message_Gets(message);
            if (_mess != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(_mess));
            }
            else
            {
                context.Response.Write("False");
            }
        }

        //获取联系组下的教师或学生
        public void MyGroupUser_List(HttpContext context)
        {
            MyGroupUser model = new MyGroupUser
            {
                GroupID = Convert.ToInt32(context.Request["GroupID"]),
                UserType=Convert.ToInt32(context.Request["UserType"])
            };
            //int PageIndex = Convert.ToInt32(context.Request["PageIndex"]);
            //int PageSize = Convert.ToInt32(context.Request["PageSize"]);
            IES.G2S.CourseLive.BLL.Test.MyGroupBLL mygroupbll = new IES.G2S.CourseLive.BLL.Test.MyGroupBLL();
            List<MyGroupUser> list = mygroupbll.MyGroupUser_List(model);
            if (list != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else
            {
                context.Response.Write("False");
            }
        }

        //获取上一封或下一封的ID
        public void GetMessageUN(HttpContext context)
        {
            int MessageID = Convert.ToInt32(context.Request["MessageID"]);
            int UserID = UserService.CurrentUser.UserID;
            int NextOrLast = Convert.ToInt32(context.Request["NextOrLast"]);
            int Type = Convert.ToInt32(context.Request["Type"]);
            IES.CC.Model.Test.Message message = new IES.CC.Model.Test.Message { MessageID = MessageID, UserID = UserID, NextOrLast = NextOrLast, Type = Type };
            IES.G2S.CourseLive.BLL.Test.MessageBLL messagebll = new IES.G2S.CourseLive.BLL.Test.MessageBLL();
            IES.CC.Model.Test.Message _mess = messagebll.Message_Get(message);
            if (_mess != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(_mess));
            }
            else
            {
                context.Response.Write("False");
            }
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