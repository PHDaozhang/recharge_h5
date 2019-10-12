/**
 * Created by wjdeng on 2015/12/18.
 */

module cui
{
    export class TableScroller extends cui.Group
    {
        
        public scrollPolicyV:string = "";
        public scrollPolicyH:string = "";
        public viewport:eui.IViewport = null;
        public activeInView: boolean = false;//显示时 触发激活
        public canOutBound: boolean=false; //是否能拖动 超出边界
        public repeatClk: boolean=false;//是否可重复点击

        public tableSize: number=0; //table 项的大小

        //下列属性 必须和 viewport 一置
        public paddingBottom: number;
        public paddingTop: number;
        public paddingRight: number;
        public paddingLeft: number;
    }
}
