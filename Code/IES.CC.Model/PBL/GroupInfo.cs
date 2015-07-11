using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.CC.OC.Model;

namespace IES.CC.Model.PBL
{
    public class GroupInfo
    {
        public List<Group> grouplist { get; set; }

        public List<GroupMember> groupmemberlist { get; set; }

        public List<OCFCLiveGroup> ocfclivegrouplist { get; set; }
        
    }
}
