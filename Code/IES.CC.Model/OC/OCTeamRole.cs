using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    [Serializable]
    public class OCTeamRole
    {
        public List<TeachingClassL> TeachingClassID_list { get; set; }

        private int _ocid;
        private int _userid;
        private int _role = 0;
        private int? _status = 0;
        /// <summary>
        /// 
        /// </summary>
        public int OCID
        {
            set { _ocid = value; }
            get { return _ocid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int UserID
        {
            set { _userid = value; }
            get { return _userid; }
        }
        /// <summary>
        ///-1 非团队成员 0 课程创建人、 1 课程负责人 ;  2 主讲教师  ;  3 助教（需对功能模块授权） ；4 教学督导（该用户不体现在教学团队中，系统默认创建，教学督导有对资源建设、互动的浏览权限）。
        /// </summary>
        public int Role
        {
            set { _role = value; }
            get { return _role; }
        }
    }

    public class TeachingClassL
    {
        public int TeachingClassID { get; set; }
    }
}
