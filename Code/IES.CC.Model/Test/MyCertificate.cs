using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Test
{
    public partial class MyCertificate
    {

        #region 补充信息

        public string RealName { get; set; }
        public string CertificateNo { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string OrganizationName { get; set; }
        public string UserNo { get; set; }
        public string TeacherName { get; set; }
        public Decimal Credit { get; set; }
        public Decimal Hours { get; set; }
        public string TeachingTime { get; set; }
        public string StudyRate { get; set; }
        public string Ranks { get; set; }

        #endregion

        public MyCertificate() { }

        #region Model

        private int _CertificateID;
        private int _UserID;
        private int _OCID;
        private DateTime? _CreateDate;
        private double _Score;

        public int CertificateID
        {
            set { _CertificateID = value; }
            get { return _CertificateID; }
        }

        public int UserID
        {
            set { _UserID = value; }
            get { return _UserID; }
        }

        public int OCID
        {
            set { _OCID = value; }
            get { return _OCID; }
        }

        public DateTime? CreateDate
        {
            set { _CreateDate = value; }
            get { return _CreateDate; }
        }

        public double Score
        {
            set { _Score = value; }
            get { return _Score; }
        }

        #endregion

    }
}
