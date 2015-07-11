using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    [Serializable]
    public partial class OCClassTree
    {
        public OCClassTree()
        { }
        #region Model
        public int ID { get; set; }
        public string Name { get; set; }
        public int ParentID { get; set; }
        public bool IsSelected { get; set; }
        public int UserID { get; set; }
        public int OCID { get; set; }
        #endregion

    }
}
