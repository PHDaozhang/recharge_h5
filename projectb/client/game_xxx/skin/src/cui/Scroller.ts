/**
 * Created by wjdeng on 2016/1/22.
 */

module cui
{
    export class Scroller extends cui.Group
    {
        public scrollPolicyV:string = "";
        public scrollPolicyH:string = "";
        public viewport:eui.IViewport = null;
    }
}
