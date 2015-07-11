using IES.CC.Forum.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IES.DataBase;
using System.Data;

namespace IES.G2S.CourseLive.DAL.Forum
{
    public class ForumTopicTypeDAL
    {
        #region 新增
        /// <summary>
        /// 分享帖子
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static bool ForumTopicType_Edit(ForumTopicType model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TopicID", model.TopicID);
                    p.Add("@ForumTypeIDS", model.ForumTypeIDS);
                    conn.Execute("ForumTopicType_Edit", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion
    }
}
