using IES.G2S.CourseLive.DAL.Analysis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Analysis
{
    public class AnalysisBLL
    {
        //统计在线学生数
        public List<IES.CC.Model.Analysis.AnalysisStudent> OnLineStudentCount_Get(IES.CC.Model.Analysis.Analysis model)
        {
            var list = AnalysisDAL.OnLineStudentCount_Get(model);
            if (model.Type == 2)
            {
                var newlist = list.OrderByDescending(s => s.AvgStudentCount).ToList();
                for (var i = 0; i < list.Count; i++)
                {
                    if (list[i].Week == newlist[0].Week)
                    {
                        list[i].IsM = 2;
                    }
                    else if (list[i].Week == newlist[newlist.Count - 1].Week)
                    {
                        list[i].IsM = 1;
                    }
                    else
                    {
                        list[i].IsM = 0;
                    }
                }
            }
            else if(model.Type==3)
            {
                var newlist = list.OrderByDescending(s => s.StudentCount).ToList();
                for (var i = 0; i < list.Count; i++)
                {
                    if (list[i].Date == newlist[0].Date)
                    {
                        list[i].IsM = 2;
                    }
                    else if (list[i].Date == newlist[newlist.Count - 1].Date)
                    {
                        list[i].IsM = 1;
                    }
                    else
                    {
                        list[i].IsM = 0;
                    }
                }
            }          
            return list;
        }
        //学生活跃度排行
        public List<IES.CC.Model.Analysis.AnalysisStudent> StudentLiveness_Get(IES.CC.Model.Analysis.Analysis model)
        {
            var list = AnalysisDAL.StudentLiveness_Get(model);
            var query = from student in list orderby student.AllCount descending select student;
            return query.ToList();
        }
        //学生在线次数排行
        public List<IES.CC.Model.Analysis.AnalysisStudent> StudentOnlineDesc_Get(IES.CC.Model.Analysis.Analysis model)
        {
            var list = AnalysisDAL.StudentOnlineDesc_Get(model);
            var query = from student in list orderby student.AllLogins descending select student;
            return query.ToList();
        }
        //统计登录人数占比
        public IES.CC.Model.Analysis.AnalysisStudent LoginStudentRate_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.LoginStudentRate_Get(model);
        }
        //获取在线课程教师的工作情况
        public List<IES.CC.Model.Analysis.AnalysisTeacher> OCTeacherWork_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.OCTeacherWork_Get(model);
        }
        //教师活跃度对比
        public List<IES.CC.Model.Analysis.AnalysisTeacher> OCTeacherLiveness_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.OCTeacherLiveness_Get(model);
        }
        //教师工作侧重分析
        public IES.CC.Model.Analysis.AnalysisTeacher OCTeacherFocusAnalysis_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.OCTeacherFocusAnalysis_Get(model);
        }
        //在线课程资源汇总
        public IES.CC.Model.Analysis.AnalysisCourse FileSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.FileSummary_Get(model);
        }
        //在线课程习题汇总
        public IES.CC.Model.Analysis.AnalysisCourse ExerciseSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.ExerciseSummary_Get(model);
        }
        //在线课程知识点汇总
        public IES.CC.Model.Analysis.AnalysisCourse KenSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.KenSummary_Get(model);
        }
        //在线课程翻转课堂汇总
        public IES.CC.Model.Analysis.AnalysisCourse OCFCSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.OCFCSummary_Get(model);
        }
        //在线课程Mooc汇总
        public IES.CC.Model.Analysis.AnalysisCourse MoocSummary_Get(IES.CC.Model.Analysis.Analysis model)
        {
            return AnalysisDAL.MoocSummary_Get(model);
        }
    }
}
