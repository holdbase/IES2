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
                    return conn.Execute("OCTeam_MainTeacher_Del", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 文件添加      
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int File_ADD(IES.Resource.Model.File model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@FileID", model.FileID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@CourseID", model.CourseID);
                    p.Add("@FolderID", model.FolderID);
                    p.Add("@CreateUserID", model.CreateUserID);
                    p.Add("@CreateUserName", model.CreateUserName);
                    p.Add("@OwnerUserID", model.OwnerUserID);
                    p.Add("@FileTitle", model.FileTitle);
                    p.Add("@FileName", model.FileName);
                    p.Add("@Ext", model.Ext);
                    p.Add("@FileType", model.FileType);
                    p.Add("@FileSize", model.FileSize);
                    p.Add("@pingyin", model.pingyin);
                    p.Add("@ServerID", model.ServerID);
                    p.Add("@TimeLength", model.TimeLength);
                    return conn.Execute("File_ADD", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 文件移除
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int File_Move(int fileId, int ocid, int userId, int type)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@FileID", fileId);
                    p.Add("@OCID", ocid);
                    p.Add("@UserID", userId);
                    p.Add("@Type", type);
                    return conn.Execute("File_Move", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 微课新增修改课节      
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int MicroChapter_Edit(IES.Resource.Model.Chapter model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@ChapterID", model.ChapterID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@OwnerUserID", model.OwnerUserID);
                    p.Add("@CreateUserID", model.CreateUserID);
                    p.Add("@Title", model.Title);
                    p.Add("@Brief", model.Brief);
                    return conn.Execute("MicroChapter_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 章节删除
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int Chapter_Del(int chapterID, int userId)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@ChapterID", chapterID);
                    p.Add("@UserID", userId);
                    return conn.Execute("Chapter_Del", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 设置MOOC或微课章节下的文件      
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int OCMoocFile_Edit(int ocid, int chapterId, int fileId, int timeLimit, int isMust, int isMicroVideo)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", ocid);
                    p.Add("@ChapterID", chapterId);
                    p.Add("@FileID", fileId);
                    p.Add("@Timelimit", timeLimit);
                    p.Add("@IsMust", isMust);
                    p.Add("@IsMicroVideo", isMicroVideo);
                    return conn.Execute("OCMoocFile_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 获取微课的基本信息    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Micro.OCMicro> OCMicro_Get(int ocid)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", ocid);
                    return conn.Query<IES.CC.Model.Micro.OCMicro>("OCMicro_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch { return null; }
        }

        /// <summary>
        /// 获取课程的主讲教师列表  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Micro.OCTeamTeacher> OCTeam_MainTeacher_List(int ocid)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", ocid);
                    return conn.Query<IES.CC.Model.Micro.OCTeamTeacher>("OCTeam_MainTeacher_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch { return null; }
        }

        /// <summary>
        /// 获取微课下的课节列表 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Micro.OCTeamChapter> OCMicroChapter_List(int ocid)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", ocid);
                    return conn.Query<IES.CC.Model.Micro.OCTeamChapter>("OCMicroChapter_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch { return null; }
        }

        /// <summary>
        /// 获取微课下的课程资料列表  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Micro.OCTeamFile> OCMicroFile_List(int ocid, int chapterId)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", ocid);
                    p.Add("@ChapterID", chapterId);
                    return conn.Query<IES.CC.Model.Micro.OCTeamFile>("OCMicroFile_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch { return null; }
        }

        /// <summary>
        /// 微课试卷的新增编辑      
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int MicroPaper_Edit(IES.CC.Model.Micro.MicroPaper model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@PaperID", model.PaperID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@CourseID", model.CourseID);
                    p.Add("@OwnerUserID", model.OwnerUserID);
                    p.Add("@CreateUserID", model.CreateUserID);
                    p.Add("@Papername", model.Papername);
                    p.Add("@Type", model.Type);
                    p.Add("@Scope", model.Scope);
                    p.Add("@ShareScope", model.ShareScope);
                    p.Add("@TimeLimit", model.TimeLimit);
                    p.Add("@Brief", model.Brief);
                    p.Add("@Score", model.Score);
                    p.Add("@Num", model.Num);
                    return conn.Execute("MicroChapter_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 试卷分组新增      
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int PaperGroup_ADD(IES.CC.Model.Micro.PaperGroup model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@GroupID", model.GroupID);
                    p.Add("@PaperID", model.PaperID);
                    p.Add("@GroupName", model.GroupName);
                    p.Add("@Orde", model.Orde);
                    p.Add("@Brief", model.Brief);
                    p.Add("@Timelimit", model.Timelimit);
                    return conn.Execute("PaperGroup_ADD", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }
        /// <summary>
        /// 微课下测试修改注释说明  
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="brief"></param>
        /// <returns></returns>
        public static int MicroPaperGroupBrief_Edit(int groupId, string brief)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@GroupID", groupId);
                    p.Add("@Brief", brief);
                    return conn.Execute("MicroPaperGroupBrief_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 添加测试  【师生】作业考试/index.html#p=新增作业      
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int Test_ADD(IES.CC.Model.Micro.MicroTest model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", model.TestID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@UserName", model.UserName);
                    p.Add("@OCID", model.OCID);
                    p.Add("@CourseID", model.CourseID);
                    p.Add("@Name", model.Name);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    p.Add("@ChapterID", model.ChapterID);
                    p.Add("@ChapterName", model.ChapterName);
                    p.Add("@Type", model.Type);
                    p.Add("@ScaleType", model.ScaleType);
                    p.Add("@BuildMode", model.BuildMode);
                    p.Add("@LessTimes", model.LessTimes);
                    p.Add("@MoreTimes", model.MoreTimes);
                    p.Add("@PassScore", model.PassScore);
                    p.Add("@ScoreMode", model.ScoreMode);
                    p.Add("@ScoreSource", model.ScoreSource);
                    p.Add("@ShowResult", model.ShowResult);
                    p.Add("@ShowExercise", model.ShowExercise);
                    p.Add("@ExerciseShowMode", model.ExerciseShowMode);
                    p.Add("@Delay", model.Delay);
                    p.Add("@DelayScoreDiscount", model.DelayScoreDiscount);
                    p.Add("@StudentCheckNum", model.StudentCheckNum);
                    p.Add("@LostScoreDiscount", model.LostScoreDiscount);
                    p.Add("@EndCheckTime", model.EndCheckTime);
                    p.Add("@TimeOption", model.TimeOption);
                    p.Add("@Brief", model.Brief);
                    return conn.Execute("Test_ADD", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }


        /// <summary>
        /// 测试与试卷信息绑定
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int TestPaper_Edit(int testID, int paperID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", testID);
                    p.Add("@PaperID", paperID);
                    return conn.Execute("TestPaper_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }


        /// <summary>
        /// 课程测试添加到微课
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int OCMoocLive_Add(IES.CC.OC.Model.OCMoocLive model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@MoocLiveID", model.MoocLiveID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@ChapterID", model.ChapterID);
                    p.Add("@SourceID", model.SourceID);
                    p.Add("@Source", model.Source);
                    p.Add("@IsMust", model.IsMust);
                    p.Add("@IsDiscuss", model.IsDiscuss);
                    return conn.Execute("OCMoocLive_Add", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 习题新增修改(单选,多选)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int Exercise_MultipleChoice_M_Edit(IES.CC.Model.Micro.ExerciseInfo model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@ExerciseID", model.ExerciseID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@CourseID", model.CourseID);
                    p.Add("@OwnerUserID", model.OwnerUserID);
                    p.Add("@CreateUserID", model.CreateUserID);
                    p.Add("@CreateUserName", model.CreateUserName);
                    p.Add("@ExerciseType", model.ExerciseType);
                    p.Add("@ExerciseTypeName", model.ExerciseTypeName);
                    p.Add("@ParentID", model.ParentID);
                    p.Add("@Scope", model.Scope);
                    p.Add("@Diffcult", model.Diffcult);
                    p.Add("@ShareRange", model.ShareRange);
                    p.Add("@Keys", model.Keys);
                    p.Add("@Kens", model.Kens);
                    p.Add("@Conten", model.Conten);
                    p.Add("@Analysis", model.Analysis);
                    p.Add("@Chapter ", model.Chapter);
                    return conn.Execute("Exercise_MultipleChoice_M_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }


        /// <summary>
        /// 选项内容为空则表示该选项要删除
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int Exercise_MultipleChoice_S_Edit(int exerciseID, string content)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@ExerciseID", exerciseID);
                    p.Add("@Content", content);
                    return conn.Execute("Exercise_MultipleChoice_S_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }

        /// <summary>
        /// 问答题、写作题信息维护    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int Exercise_Writing_M_Edit(IES.CC.Model.Micro.ExerciseWrittingInfo model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@ExerciseID", model.ExerciseID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@CourseID", model.CourseID);
                    p.Add("@OwnerUserID", model.OwnerUserID);
                    p.Add("@CreateUserID", model.CreateUserID);
                    p.Add("@CreateUserName", model.CreateUserName);
                    p.Add("@ExerciseType", model.ExerciseType);
                    p.Add("@ExerciseTypeName", model.ExerciseTypeName);
                    p.Add("@Scope", model.Scope);
                    p.Add("@Diffcult", model.Diffcult);
                    p.Add("@ShareRange", model.ShareRange);
                    p.Add("@Keys", model.Keys);
                    p.Add("@Kens", model.Kens);
                    p.Add("@Conten", model.Conten);
                    p.Add("@Analysis", model.Analysis);
                    p.Add("@Answer", model.Answer);
                    p.Add("@ScorePoint", model.ScorePoint);
                    p.Add("@ParentID", model.ParentID);
                    p.Add("@Chapter", model.Chapter);
                    return conn.Execute("Exercise_Writing_M_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }


        /// <summary>
        /// 试卷分组添加习题  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int PaperExercise_ADD(int paperID, int paperGroupID, int exerciseID, float score, int order, int parentExerciseID)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@PaperID", paperID);
                    p.Add("@PaperGroupID", paperGroupID);
                    p.Add("@ExerciseID", exerciseID);
                    p.Add("@Score", score);
                    p.Add("@Order", order);
                    p.Add("@ParentExerciseID", parentExerciseID);
                    return conn.Execute("PaperExercise_ADD", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }


        /// <summary>
        /// 获取习题的列表信息  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Micro.ExerciseSummary> Exercise_Paper_Search(IES.CC.Model.Micro.ExerciseCondition model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@Searchkey", model.Searchkey);  //--查询关键字                          
                    p.Add("@PageSize", model.PageSize);
                    p.Add("@PageIndex", model.PageIndex);
                    p.Add("@OCID", model.OCID); // -- 在线课程编号                             
                    p.Add("@UserID", model.UserID);// -- 当前用户身份编号                          
                    p.Add("@ExerciseType", model.ExerciseType); // -- 习题题型                          
                    p.Add("@Diffcult", model.Diffcult); // -- 难度系统                          
                    p.Add("@Scope", model.Scope); // -- 适用范围                              
                    p.Add("@Kens", model.Kens); // -- 知识点名称                         
                    p.Add("@Keys", model.Keys); // -- 标签名称                        
                    p.Add("@ExerciseTypes", model.ExerciseTypes); // --题型集合(逗号分隔) 例如微课选习题时:'2,3,10'
                    return conn.Query<IES.CC.Model.Micro.ExerciseSummary>("Exercise_Paper_Search", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch { return null; }
        }


        /// <summary>
        /// 试卷分组下的习题分数设置
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int PaperExerciseScore_Upd(int paperExerciseID, float score)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@PaperExerciseID", paperExerciseID);
                    p.Add("@Score", score);
                    return conn.Execute("PaperExerciseScore_Upd", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }


        /// <summary>
        /// 移除微课测试试卷下的习题
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int MicroExercise_Del(int paperExerciseID)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();
                    p.Add("@PaperExerciseID", paperExerciseID);
                    return conn.Execute("MicroExercise_Del", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch { return -1; }
        }


        /// <summary>
        /// 获取微课下测试试卷信息    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<IES.CC.Model.Micro.MicroTestPaper> MicroPaper_Get(int ocid)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", ocid);
                    return conn.Query<IES.CC.Model.Micro.MicroTestPaper>("MicroPaper_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch { return null; }
        }

        //获取试卷的详细信息
        /// <summary>
        /// 获取试卷的详细信息
        /// </summary>
        /// <param name="PaperID"></param>
        /// <returns></returns>
        public static IES.Resource.Model.PaperInfo PaperInfo_Get(int PaperID, string exerciseIDS)
        {
            using (var conn = DbHelper.CommonService())
            {
                IES.Resource.Model.PaperInfo pi = new IES.Resource.Model.PaperInfo();
                var p = new DynamicParameters();
                p.Add("@PaperID", PaperID);
                p.Add("@ExerciseIDS", exerciseIDS);
                var paperinfo = conn.QueryMultiple("PaperInfo_Get", p, commandType: CommandType.StoredProcedure);
                List<IES.Resource.Model.Paper> paper = paperinfo.Read<IES.Resource.Model.Paper>().ToList();
                if (paper != null && paper.Count > 0)
                {
                    pi.paper = paper[0];
                }
                pi.papergrouplist = paperinfo.Read<IES.Resource.Model.PaperGroup>().ToList();
                pi.attachmentlist = paperinfo.Read<IES.Resource.Model.Attachment>().ToList();
                pi.exerciselist = paperinfo.Read<IES.Resource.Model.PaperExercise>().ToList();
                pi.ExerciseChoices = paperinfo.Read<IES.Resource.Model.ExerciseChoice>().ToList();
                pi.ExerciseAttachmentlist = paperinfo.Read<IES.Resource.Model.Attachment>().ToList();
                return pi;
            }
        }
    }
}
