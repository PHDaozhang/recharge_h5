/**
 * Created by wjdeng on 2015/12/24.
 */

// 1.target 必须是UIDataGroup
// 2. data 中需要有 width  height 属性

module cui
{
    export class DataLineLayout extends eui.LayoutBase
    {
        public isHorizontal:boolean = true;//是否为水平布局 true:水平布局， false：垂直布局。 默认水平

        public gap:number = 0;
        public itemH:number = 0;
        public itemW:number = 0;
        
        public paddingBottom: number;
        public paddingTop: number;
        public paddingRight: number;
        public paddingLeft: number;
        public horizontalAlign:string = "";
        public verticalAlign: string = "";
    }
}
