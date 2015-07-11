using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace  IES.CC.Model.PBL
{

    /// <summary>
    /// 分组策略关联的教学班级
    /// </summary>
   public   class GroupModeOCClass
    {
            //t1.GroupModeID ,t1.OCClassID , t2.TeachingClassID ,t2.TeachingClassName

       public int GroupModeID { get; set; }

       public int OCClassID { get; set; }

       public int TeachingClassID { get; set; }

       public int TeachingClassName { get; set; }

    }
}
