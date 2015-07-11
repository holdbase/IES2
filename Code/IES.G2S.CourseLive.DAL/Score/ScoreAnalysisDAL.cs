using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.CC.Model.Score;
using IES.DataBase;
using Dapper;
using System.Data;

namespace IES.G2S.CourseLive.DAL.Score
{
    /// <summary>
    /// xuwei
    /// 2014年12月25日
    /// </summary>
    public class ScoreAnalysisDAL
    {
        #region  列表
        /// <summary>
        /// 成绩分析
        /// </summary>
        /// <param name="scoreType"></param>
        /// <returns></returns>
        public static ScoreAnalysis ScoreAnalysis_List(int OCID, int OCClassID, string UserName, int PageIndex = 1, int PageSize = 20)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", OCID);
                    p.Add("@OCClassID", OCClassID);
                    p.Add("@UserName", UserName);
                    p.Add("@PageSize", PageSize);
                    p.Add("@PageIndex", PageIndex);
                    var multi = conn.QueryMultiple("Score_List", p, commandType: CommandType.StoredProcedure);
                    var scoreTypeWeight = multi.Read<ScoreTypeWeight>().ToList();
                    var scoreWeightStudent = multi.Read<ScoreWeightStudent>().ToList();
                    var item = new ScoreAnalysis();
                    item.ScoreTypeWeight = scoreTypeWeight;
                    var studentScoreDetail = new List<StudentScoreDetail>();
                    item.ColumnCount = item.ScoreTypeWeight.Count + 3; //处理列总数
                    var typeList = ScoreTypeDAL.ScoreType_List(OCID);//获取所有类别
                    //添加父节点
                    var parentnodes = from r in item.ScoreTypeWeight
                                      group r by r.ParentID into n
                                      select new ScoreTypeWeight()
                                      {
                                          ScoreTypeID = n.Key,
                                          ParentID = 0,
                                          Colspan = n.Count(),
                                          Power = n.Sum(r => r.Power)

                                      };
                    foreach (var parentnode in parentnodes)
                    {
                        var first = typeList.Find(t => t.ScoreTypeID == parentnode.ScoreTypeID);
                        if (first == null)
                            continue;
                        parentnode.Name = first.Name;
                        parentnode.Orde = first.Orde;
                        item.ScoreTypeWeight.Add(parentnode);
                        var children = item.ScoreTypeWeight.Where(t => t.ParentID == parentnode.ScoreTypeID);
                        //重置子节点的排序
                        foreach (var child in children)
                        {
                            child.Orde = parentnode.Orde + float.Parse("0." + ((int)child.Orde).ToString());
                        }
                    }
                    //对数据进行排序
                    item.ScoreTypeWeight = item.ScoreTypeWeight.OrderBy(t => t.ParentID).ThenBy(t => t.Orde).ToList();
                    //筛选没有父节点的数据
                    var scoreTypeWeightWithoutParent = item.ScoreTypeWeight.Where(t => t.Colspan == 0).OrderBy(t => t.Orde).ToList();
                    //对学生成绩处理
                    if (scoreWeightStudent.Count > 0)
                    {
                        var flagUserID = 0;
                        for (var i = 0; i < scoreWeightStudent.Count; i++)
                        {
                            if (flagUserID != scoreWeightStudent[i].UserID)
                            {
                                flagUserID = scoreWeightStudent[i].UserID;
                                var flagUser = new StudentScoreDetail();
                                flagUser.UserID = scoreWeightStudent[i].UserID;
                                flagUser.UserName = scoreWeightStudent[i].UserName;
                                flagUser.UserNo = scoreWeightStudent[i].UserNo;
                                flagUser.ScoreList = new float[scoreTypeWeightWithoutParent.Count];
                                studentScoreDetail.Add(flagUser);
                            }
                            var findIndex = scoreTypeWeightWithoutParent.FindIndex(t => t.ScoreTypeID == scoreWeightStudent[i].ScoreTypeID);
                            if (findIndex > -1)
                                studentScoreDetail.Last().ScoreList[findIndex] = scoreWeightStudent[i].Score;
                        }
                    }
                    item.StudentScoreDetail = studentScoreDetail;
                    return item;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
    }
}
