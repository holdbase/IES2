using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IES.CC.Model.OC;
using IES.CC.OC.Model;
using IES.DataBase;
using IES.JW.Model;
using IES.Resource.Model;

namespace IES.G2S.CourseLive.DAL.StudyProgress
{
    public class StudyProgressDAL
    {
        public static List<OCClass> OCMoocClass_List(int OCID, string Key, int IsHistroy, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@Key", Key);
                    p.Add("@IsHistroy", IsHistroy);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<OCClass>("OCMoocClass_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static List<OCMoocStudyStudent> OCMoocStudyStudent_List(int OCID, int Type, string Year, string Month)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@Type", Type);
                    p.Add("@Year", Year);
                    p.Add("@Month", Month);

                    return conn.Query<OCMoocStudyStudent>("OCMoocStudyStudents_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static List<TeachingClassStudent> OCMoocClassStudent_List(string key, int OCClassID, int Type, int LowThanRate, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@key", key);
                    p.Add("@OCClassID", OCClassID);
                    p.Add("@Type", Type);
                    p.Add("@LowThanRate", LowThanRate);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<TeachingClassStudent>("OCMoocClassStudent_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static TeachingClassStudent OCMoocStudent_StudyDesc_Get(int OCID, int UserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@UserID", UserID);
                    return conn.Query<TeachingClassStudent>("OCMoocStudent_StudyDesc_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static List<OCMoocStudyStudent> OCMoocStudents_SendMsg(int OCID, int OCClassID, int Rate, string StudentUserIDs, string Title, string Conten, int SendUserID, bool IsForMail, bool IsForSMS)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@OCClassID", OCClassID);
                    p.Add("@Rate", Rate);
                    p.Add("@StudentUserIDs", StudentUserIDs);
                    p.Add("@Title", Title);
                    p.Add("@Conten", Conten);
                    p.Add("@SendUserID", SendUserID);
                    p.Add("@IsForMail", IsForMail);
                    p.Add("@IsForSMS", IsForSMS);
                    return conn.Query<OCMoocStudyStudent>("OCMoocStudents_SendMsg", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static List<Chapter> OCMoocStudentChapterTest_List(int OCID, int UserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@UserID", UserID);
                    return conn.Query<Chapter>("OCMoocStudentChapterTest_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static List<OCMoocFile> OCMoocFile_StudyDesc_List(int OCID, int UserID, int ChapterID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@UserID", UserID);
                    p.Add("@ChapterID", ChapterID);
                    return conn.Query<OCMoocFile>("OCMoocFile_StudyDesc_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static void OCMoocStudent_Drop(int OCID, string UserIDs)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@UserIDs", UserIDs);
                    conn.Execute("OCMoocStudent_Drop", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                 
            }
        }


        public static OCMooc OCMoocStudyStatusStudents_Get(int OCID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    return conn.Query<OCMooc>("OCMoocStudyStatusStudents_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
