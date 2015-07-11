using Dapper;
using IES.CC.Model.Test;
using IES.DataBase;
using IES.JW.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.DAL.Test
{
    public class CertificateDAL
    {

        #region 列表

        //获取证书列表
        public static List<MyCertificate> Certificate_List(MyCertificate model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@userid", model.UserID);
                    return conn.Query<MyCertificate>("MyCertificate_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception)
            {
                return new List<MyCertificate>();
            }
        }

        #endregion

        #region 详细信息

        //获取证书详细信息
        public static MyCertificate MyCertificate_Get(MyCertificate model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@CertificateID", model.CertificateID);
                    return conn.Query<MyCertificate>("MyCertificate_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        //获取真实姓名
        public static User RealName_Get(User model)
        {
            try
            {
                using (var conn = DbHelper.JWService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", model.UserID);
                    return conn.Query<User>("RealName_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        #endregion

        #region 修改

        //修改真实姓名
        public static bool Certificate_Upd(User model)
        {
            try
            {
                using (var conn = DbHelper.JWService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", model.UserID);
                    p.Add("@RealName", model.RealName);
                    conn.Execute("Certificate_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

    }
}
