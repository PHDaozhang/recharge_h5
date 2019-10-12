module cui {
	/**
	 *
	 * @author 
	 *
	 */
    export class TileLayout extends LayoutBase
    {
        public isHorizontal: boolean = true;//网格内是否优先水平布局 true:优先水平布局， false：优先垂直布局。 默认水平
        public horizontalGap: number = 0;//水平间隔
        public verticalGap: number = 0;//垂直间隔
        public itemH: number = 0;
        public itemW: number = 0;
        public horizontalAlign: string = "";
        public verticalAlign: string = "";
	}
}
