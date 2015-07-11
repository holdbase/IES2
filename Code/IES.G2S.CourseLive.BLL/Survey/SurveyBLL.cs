using IES.CC.Model.Survey;
using IES.G2S.CourseLive.DAL.Survey;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Survey
{
    public class SurveyBLL
    {
        //我创建的问卷列表
        public List<IES.CC.Model.Survey.Survey> Survey_MyCreate_List(IES.CC.Model.Survey.Survey model, int PageIndex, int PageSize)
        {
            var list = SurveyDAL.Survey_MyCreate_List(model, PageIndex, PageSize);
            DateTime date = DateTime.Now;
            for (var i = 0; i < list.Count; i++)
            {
                var surveyid = list[i].SurveyID;
                var status = list[i].Status;
                DateTime start = Convert.ToDateTime(list[i].StartDate);
                DateTime end = Convert.ToDateTime(list[i].EndDate);
                if (status != 3 && status != 2 && start <= date && date < end.AddDays(1))//未进行、结束→进行
                {
                    IES.CC.Model.Survey.Survey survey = new CC.Model.Survey.Survey { SurveyID = surveyid, Status = 2 };
                    bool result = Survey_Status_Upd(survey);
                    if (result == true) { list[i].Status = 2; }
                }
                else if (status != 4 && date > end.AddDays(1))//未开始、暂停、进行→结束
                {
                    IES.CC.Model.Survey.Survey survey = new CC.Model.Survey.Survey { SurveyID = surveyid, Status = 4 };
                    bool result = Survey_Status_Upd(survey);
                    if (result == true) { list[i].Status = 4; }
                }
                else if (status != 1 && date < start)//暂停、进行、结束→未开始
                {
                    IES.CC.Model.Survey.Survey survey = new CC.Model.Survey.Survey { SurveyID = surveyid, Status = 1 };
                    bool result = Survey_Status_Upd(survey);
                    if (result == true) { list[i].Status = 1; }
                }
                else { }
            }
            return list;
        }
        //我参与的问卷列表
        public List<IES.CC.Model.Survey.Survey> Survey_MyJoin_List(IES.CC.Model.Survey.Survey model, int PageIndex, int PageSize)
        {
            var list= SurveyDAL.Survey_MyJoin_List(model, PageIndex, PageSize);
            DateTime date = DateTime.Now;
            for (var i = 0; i < list.Count; i++)
            {
                var surveyid = list[i].SurveyID;
                var status = list[i].Status;
                DateTime start = Convert.ToDateTime(list[i].StartDate);
                DateTime end = Convert.ToDateTime(list[i].EndDate);
                if (status != 3 && status != 2 && start <= date && date < end.AddDays(1))//未进行、结束→进行
                {
                    IES.CC.Model.Survey.Survey survey = new CC.Model.Survey.Survey { SurveyID = surveyid, Status = 2 };
                    bool result = Survey_Status_Upd(survey);
                    if (result == true) { list[i].Status = 2; }
                }
                else if (status != 4 && date > end.AddDays(1))//未进行、暂停、进行→结束
                {
                    IES.CC.Model.Survey.Survey survey = new CC.Model.Survey.Survey { SurveyID = surveyid, Status = 4 };
                    bool result = Survey_Status_Upd(survey);
                    if (result == true) { list[i].Status = 4; }
                }
                else { }
            }
            return list;
        }

        public List<IES.CC.Model.Survey.Survey> Survey_Simple_List(IES.CC.Model.Survey.Survey model, int PageIndex, int PageSize)
        {
            return SurveyDAL.Survey_Simple_List(model, PageIndex, PageSize);
        }
        
        // 获取调查问卷的详细信息
        public IES.CC.Model.Survey.Survey Survey_Get(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.Survey_Get(model);
        }

        // 获取调查问卷的详细信息
        public IES.CC.Model.Survey.SurveyInfo SurveyInfo_Get(int SurveyID)
        {
            IES.CC.Model.Survey.Survey model = new CC.Model.Survey.Survey { SurveyID = SurveyID };
            return SurveyDAL.SurveyInfo_Get(model);
        }

        // 获取调查问卷的详细信息
        public IES.CC.Model.Survey.SurveyInfo SurveyInfo_Get(IES.CC.Model.Survey.Survey model)
        {
            var survey = SurveyDAL.SurveyInfo_Get(model);
            var qlist = survey.question;
            var ilist = survey.questionitem;
            for (var i = 0; i < qlist.Count; i++)
            {
                if (qlist[i].ParentID != 0)
                {
                    if (qlist[i].Type == 8 || qlist[i].Type == 9)
                    {
                        List<SurveyQuestionitem> Items = new List<SurveyQuestionitem>();
                        for (var n = 0; n < ilist.Count; n++)
                        {
                            if (ilist[n].QuestionID == qlist[i].ParentID)
                            {
                                SurveyQuestionitem item = ilist[n];
                                Items.Add(item);
                            }
                        }
                        qlist[i].Items = Items;
                    }
                }
            }
            List<SurveyQuestionitem> random = new List<SurveyQuestionitem>();
            for (var i = 0; i < qlist.Count; i++)
            {
                if (qlist[i].ParentID == 0 && qlist[i].IsRandom == true)
                {

                    for (var n = 0; n < ilist.Count; n++)
                    {
                        if (ilist[n].QuestionID == qlist[i].QuestionID)
                        {
                            SurveyQuestionitem item = ilist[n];
                            random.Add(item);
                            ilist.Remove(ilist[i]);
                            n = n - 1;
                        }
                    }
                }
            }
            var arr = randomsort(random.Count);
            for (var i = 0; i < random.Count; i++)
            {
                var n = arr[i];
                ilist.Add(random[n]);
            }
            survey.question = qlist;
            return survey;
        }
        public int[] randomsort(int b)
        {
            HashSet<int> set = new HashSet<int>();
            Random r = new Random();
            while (set.Count < b)
            {
                set.Add(r.Next(0, b));
            }
            int[] arr = set.ToArray();
            return arr;
        }
        // 问卷调查 单选题、多选题、打分题（含矩阵）答案统计
        public List<IES.CC.Model.Survey.SurveyQuestion> SurveyAnswer_All_Get(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.SurveyAnswer_All_Get(model);
        }
        // 获取调查问卷组合答案详细的详细信息
        public IES.CC.Model.Survey.SurveyInfo SurveyAnswer_Info_Get(IES.CC.Model.Survey.Survey model)
        {
            model.UserID = 0;
            var survey = SurveyDAL.SurveyInfo_Get(model);
            var answer_sta = SurveyDAL.SurveyAnswer_All_Get(model);
            var answer_get = SurveyDAL.SurveyAnswer_Get(model);
            survey.answersta = answer_sta;
            survey.answerget = answer_get;
            var qlist = survey.question;
            var ilist = survey.questionitem;
            for (var i = 0; i < qlist.Count; i++)
            {
                if (qlist[i].ParentID != 0)
                {
                    if (qlist[i].Type == 8 || qlist[i].Type == 9)
                    {
                        List<SurveyQuestionitem> Items = new List<SurveyQuestionitem>();
                        for (var n = 0; n < ilist.Count; n++)
                        {
                            if (ilist[n].QuestionID == qlist[i].ParentID)
                            {
                                SurveyQuestionitem item = ilist[n];
                                Items.Add(item);
                            }
                        }
                        qlist[i].Items = Items;
                    }
                }
            }
            survey.question = qlist;
            return survey;
        }
        // 获取调查题目的详细信息（题目+选项）
        public IES.CC.Model.Survey.SurveyInfo SurveyQuestionInfo_Get(IES.CC.Model.Survey.SurveyQuestion model)
        {
            return SurveyDAL.SurveyQuestionInfo_Get(model);
        }
        // 获取调查问卷指定问题的统计信息
        public List<IES.CC.Model.Survey.SurveyQuestion> SurveyAnswer_Statistics(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.SurveyAnswer_Statistics(model);
        }
        // 获取调查问卷的答案详细信息
        public List<IES.CC.Model.Survey.SurveyAnswer> SurveyAnswer_Get(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.SurveyAnswer_Get(model);
        }
        //获取调查问卷的被评价对象
        public List<IES.CC.Model.Survey.SurveyToObject> SurveyToObject_Get(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.SurveyToObject_Get(model);
        }
        //获取调查问卷的被评价对象&创建者
        public List<IES.JW.Model.User> SurveyToObject_My_Get(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.SurveyToObject_My_Get(model);
        }
        // 删除调查问卷
        public bool Survey_Del(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.Survey_Del(model);
        }
        //创建调查问卷
        public IES.CC.Model.Survey.Survey Survey_ADD(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.Survey_ADD(model);
        }
        //编辑调查问卷
        public bool Survey_Edit(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.Survey_Edit(model);
        }

        //修改问卷调查结果公开状态
        public bool Survey_IsOpen_Upd(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.Survey_IsOpen_Upd(model);
        }
        //更新问卷的状态
        public bool Survey_Status_Upd(IES.CC.Model.Survey.Survey model)
        {
            return SurveyDAL.Survey_Status_Upd(model);
        }
        //问卷调查投票
        public bool SurveyAnswer_Edit(IES.CC.Model.Survey.SurveyAnswer model)
        {
            IES.CC.Model.Survey.Survey survey = new CC.Model.Survey.Survey { SurveyID = model.SurveyID, UserID = model.UserID };
            bool isCan = Survey_Is_Sumbit(survey);
            if (isCan)
            {
                bool flag = SurveyDAL.SurveyAnswer_Edit(model);
                if (flag)
                {
                    bool flag1 = SurveyDAL.SurveyToObject_IsFinish_Upd(model);
                    return flag1;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        //问卷是否能提交投票
        public bool Survey_Is_Sumbit(IES.CC.Model.Survey.Survey model)
        {
            SurveyUser suser = SurveyDAL.Survey_Is_Sumbit(model);
            if (suser != null)
            {
                if (suser.Status == 1) 
                {
                    return true;    //能提交投票
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
