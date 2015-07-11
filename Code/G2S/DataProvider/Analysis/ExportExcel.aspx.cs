using IES.G2S.CourseLive.BLL.Analysis;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace App.G2S.DataProvider.Analysis
{
    public partial class ExportExcel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int type=Convert.ToInt32(Request["Type"]);
            DataTable dtExpel;
            string ExcelName = "";
            string colHeaders = "";
            if (type == 1)
            {
                ExcelName = "StudentOnline.xls";
                colHeaders = " 姓名\t 日平均次数\t 周平均次数\t 月平均次数\t 总在线次数";
                dtExpel = IES.Common.ListToDateUtil.ListToDataTable<IES.CC.Model.Analysis.StudentOnlineExport>(DataGet1());
            }
            else
            {
                ExcelName = "StudentActive.xls";
                colHeaders = " 姓名\t 资料阅读\t 发帖回复\t 参与测试\t 活跃度";
                dtExpel = IES.Common.ListToDateUtil.ListToDataTable<IES.CC.Model.Analysis.StudentActiveExport>(DataGet2());
            }
            DataSet ds = new DataSet();
            ds.Tables.Add(dtExpel.Copy());
            CreateExcelOther(this.Page, ds, colHeaders, "1", ExcelName);
        }
        public List<IES.CC.Model.Analysis.StudentOnlineExport> DataGet1()
        {
            int ocid=Convert.ToInt32(Request["OCID"]);
            DateTime sdate = Convert.ToDateTime(Request["StartDate"]);
            DateTime edate = Convert.ToDateTime(Request["EndDate"]);
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = ocid, StartDate = sdate, EndDate = edate, TopCount = 1000 };            
            var list= new AnalysisBLL().StudentOnlineDesc_Get(model);
            List<IES.CC.Model.Analysis.StudentOnlineExport> exportlist = new List<IES.CC.Model.Analysis.StudentOnlineExport>();
            for (var i = 0; i < list.Count; i++)
            {
                IES.CC.Model.Analysis.StudentOnlineExport m = new IES.CC.Model.Analysis.StudentOnlineExport();
                m.UserName = list[i].UserName;
                m.DayAvgLogins = list[i].DayAvgLogins;
                m.WeekAvgLogins = list[i].WeekAvgLogins;
                m.MonthAvgLogins = list[i].MonthAvgLogins;
                m.AllLogins = list[i].AllLogins;
                exportlist.Add(m);
            }
            return exportlist;
        }
        public List<IES.CC.Model.Analysis.StudentActiveExport> DataGet2()
        {
            int ocid = Convert.ToInt32(Request["OCID"]);
            IES.CC.Model.Analysis.Analysis model = new IES.CC.Model.Analysis.Analysis { OCID = ocid,TopCount = 1000 };
            var list = new AnalysisBLL().StudentLiveness_Get(model);
            List<IES.CC.Model.Analysis.StudentActiveExport> exportlist = new List<IES.CC.Model.Analysis.StudentActiveExport>();
            for (var i = 0; i < list.Count; i++)
            {
                IES.CC.Model.Analysis.StudentActiveExport m = new IES.CC.Model.Analysis.StudentActiveExport();
                m.UserName = list[i].UserName;
                m.FileReadCount = list[i].FileReadCount;
                m.ForumCount = list[i].ForumCount;
                m.TestCount = list[i].TestCount;
                m.AllCount = list[i].AllCount;
                exportlist.Add(m);
            }
            return exportlist;
        }
        public static void CreateExcelOther(Page page, DataSet ds, string colHeaders, string typeid, string FileName)
        {
            HttpResponse resp;
            resp = page.Response;
            resp.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");
            resp.ContentType = "application/ms-excel";
            resp.AppendHeader("Content-Disposition", "attachment;filename=" + FileName);
            int i = 0;
            System.Data.DataTable dt = ds.Tables[0];
            string bodyData = ExportTable(colHeaders, ds);
            if (typeid == "1")
            {
                resp.Write(bodyData);
            }
            else
            {
                if (typeid == "2")
                {
                    //从DataSet中直接导出XML数据并且写到HTTP输出流中
                    resp.Write(ds.GetXml());
                }
            }
            //写缓冲区中的数据到HTTP头文件中
            resp.End();
        }
        public static string ExportTable(string colHeaders, DataSet ds)
        {
            StringBuilder sb = new StringBuilder();
            int count = 0;

            foreach (DataTable tb in ds.Tables)
            {
                //data += tb.TableName + "\n"; 
                sb.AppendLine("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\">");
                sb.AppendLine("<table cellspacing=\"0\" cellpadding=\"5\" rules=\"all\" border=\"1\">");
                ////写出列名 
                sb.AppendLine("<tr style=\"font-weight: bold; white-space: nowrap;\">");
                foreach (string aStr in colHeaders.Split('\t'))
                {
                    sb.AppendLine("<td>" + aStr + "</td>");
                }
                sb.AppendLine("</tr>");

                //写出数据 
                foreach (DataRow row in tb.Rows)
                {
                    sb.Append("<tr>");
                    foreach (DataColumn column in tb.Columns)
                    {
                        //这里做你要做的操作
                        sb.Append("<td style=\"vnd.ms-excel.numberformat:@\">" + row[column].ToString().Trim() + "</td>");
                    }
                    sb.AppendLine("</tr>");
                    count++;
                }
                sb.AppendLine("</table>");
            }

            return sb.ToString();
        }
    }
}