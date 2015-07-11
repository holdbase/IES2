using System;

namespace IES.CC.Model.Analysis
{
    [Serializable]
    public partial class AnalysisCourse
    {
        public AnalysisCourse()
        { }
        public int AllCount { get; set; }
        //资源      
        public int VideoCount { get; set; }
        public int AudioCount { get; set; }
        public int WordCount { get; set; }
        public int PPTCount { get; set; }
        public int ExcelCount { get; set; }
        public int PDFCount { get; set; }
        public int PicCount { get; set; }
        public int RarCount { get; set; }
        public int ElseCount { get; set; }
        //习题
        public int PDTCount { get; set; }
        public int DanXTCount { get; set; }
        public int DuoXTCount { get; set; }
        public int MCJSCount { get; set; }
        public int TKTCount { get; set; }
        public int LXTCount { get; set; }
        public int PXTCount { get; set; }
        public int FXTCount { get; set; }
        public int JSTCount { get; set; }
        public int WDTCount { get; set; }
        public int FYTCount { get; set; }
        public int TLXLCount { get; set; }
        public int XZCount { get; set; }
        public int YDLJCount { get; set; }
        public int LunXTCount { get; set; }
        public int DTKTXCount { get; set; }
        public int ZDYTXCount { get; set; }
        public int FHTCount { get; set; }
        //知识点
        public int KnowCount { get; set; }
        public int UnderstandCount { get; set; }
        public int MasterCount { get; set; }
        //翻转课堂
        public int FcCount { get; set; }
        public int FcFileCount { get; set; }
        public int FcForumTopicCount { get; set; }
        public int FcTestCount { get; set; }
        public int FcOfflineCount { get; set; }
        public int FcOfflineScoreCount { get; set; }
        public int FcSurveyCount { get; set; }
        //Mooc
        public int McChapterCount { get; set; }
        public int McFileCount { get; set; }
        public int McForumTopicCount { get; set; }
        public int McVideoInsertCount { get; set; }
        public int McOfflineCount { get; set; }
        public int McTestCount { get; set; }
    }
}
