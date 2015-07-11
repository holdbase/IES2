using IES.CC.Forum.Model;
using IES.G2S.CourseLive.DAL.Forum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Forum
{
    public class ForumTopicTypeBLL
    {
        #region 列表
        /// <summary>
        /// 分享帖子
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool ForumTopicType_Edit(ForumTopicType model)
        {
            return ForumTopicTypeDAL.ForumTopicType_Edit(model);
        } 
        #endregion
    }
}
