module cui {
    export class ScaleButton extends eui.Button
    {
		public txtKey:string;
		//public icon:string ="";
		//public source:string|egret.Texture;
        public scaleTime:number = 100;//缩放时间
        public smallRatio:number = 0.8;//缩小的比例
        public bigRatio:number= 1.2;//放大的比例
        public tag:number = 0;
        public sound:string= "";
        public filterNm:string = "";
	}
}
