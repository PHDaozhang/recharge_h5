module cui {
	/**
	 *
	 * @author 
	 *
	 */
    export class LineLayout extends eui.LayoutBase{
        public isHorizontal: boolean = true;//是否为水平布局 true:水平布局， false：垂直布局。 默认水平

        public gap: number = 0;
        public itemH: number = 0;
        public itemW: number = 0;
        public horizontalAlign:string = "";
        public verticalAlign: string = "";
	}
}
