using IES.CC.Model.Test;
using IES.G2S.CourseLive.DAL.Test;
using IES.JW.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Test
{
    public class CertificateBLL
    {
        #region 列表

        public List<MyCertificate> Certificate_List(MyCertificate model)
        {
            return CertificateDAL.Certificate_List(model);
        }

        #endregion

        #region  详细信息

        //获取证书的详细信息
        public MyCertificate MyCertificate_Get(MyCertificate model)
        {
            return CertificateDAL.MyCertificate_Get(model);
        }

        //获取真实姓名
        public User RealName_Get(User model)
        {
            return CertificateDAL.RealName_Get(model);
        }

        #endregion

        #region 修改

        public bool Certificate_Upd(User model)
        {
            return CertificateDAL.Certificate_Upd(model);
        }

        #endregion

    }
}
