using Dapper;
using IES.DataBase;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.DAL.Micro
{
    public class MicroDAL
    {
        /// <summary>
        /// 添加OC
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int OC_ADD(IES.CC.OC.Model.OC model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", model.OCID);
                    p.Add("@CourseID", model.CourseID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@Name", model.Name);
                    p.Add("@SubjectID", model.SubjectID);
                    p.Add("@Tags", model.Tags);
                    p.Add("@Brief", model.Brief);
                    p.Add("@IsMicro", model.IsMicro);
                    p.Add("@output", 0);
                    p.Add("@IsSyncClass", 0);
                    p.Add("@LearnDays", 1000);

                    return conn.Execute("OC_ADD", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 临时保存视频文件的时间长度    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int FileTimeLength_ADD(string fileName, int timeLenghth) 
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@FileName", fileName);
                    p.Add("@TimeLength", timeLenghth);
                    return conn.Execute("FileTimeLength_ADD", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 附件新增,可以用文件表中引用文件作为附件
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int Attachment_ADD(IES.Resource.Model.Attachment attachment)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@AttachmentID", attachment.AttachmentID);
                    p.Add("@ServerID", attachment.ServerID);
                    p.Add("@FileName", attachment.FileName);
                    p.Add("@Title", attachment.Title);
                    p.Add("@FileSize", attachment.FileSize);
                    p.Add("@Source", attachment.Source);
                    p.Add("@SourceID", attachment.SourceID);
                    p.Add("@Guid", attachment.Guid);
                    p.Add("@RefFileID", attachment.RefFileID);
                    return conn.Execute("Attachment_ADD", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        ///更新文件的关联编号    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int Attachment_SourceID_Upd(string source, string sourceId, string guid)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@Source", source);
                    p.Add("@SourceID", sourceId);
                    p.Add("@Guid", guid);
                    return conn.Execute("Attachment_SourceID_Upd", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 添加或修改课程的主讲教师      
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int OCTeam_MainTeacher_Edit(int teamId, int ocid, int userId, string userName, string brief, int isSyncClass)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TeamID", teamId);
                    p.Add("@OCID", ocid);
                    p.Add("@UserID", userId);
                    p.Add("@UserName", userName);
                    p.Add("@Brief", brief);
                    p.Add("@IsSyncClass", isSyncClass);
                    conn.Execute("OCTeam_MainTeacher_Edit", p, commandType: CommandType.StoredProcedure);
                    return p.Get<int>("@TeamID");
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 添加或修改课程的主讲教师      
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int OCTeam_MainTeacher_Del(int teamId)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TeamID", teamId);
                    return  conn.Execute("OCTeam_MainTeacher_Del", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }
        
    }
}
