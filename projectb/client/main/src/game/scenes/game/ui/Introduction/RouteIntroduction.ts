module game{
    export class RouteIntroduction extends UIPopup{
        public skClose:cui.ScaleButton;
        public skLeftBtn:cui.ScaleButton;
        public skRightBtn:cui.ScaleButton;
        public skInGrp:cui.Group;
        public skImgGrp:cui.MenuGroup;

        private _routeInConfs:any[];

        private _curTg:number; //当前处在哪一列
        private _maxTg:number;//最后一列
        constructor(routeInConfs:any[], skin?: string){
            super();
            let self = this;
            self.useOnce = false;
            self.skinName = skin || "RouteIntroSkin";
            self._routeInConfs = routeInConfs;
            self.vCenter = 0;
            self.hCenter = 0;
            self.hideBg = false;
        }
        protected childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skClose.setTarget(self.close,self);
            let routeConfs = self._routeInConfs;
            self.skLeftBtn.visible = self.skRightBtn.visible = routeConfs.length !=1;
            self.skLeftBtn.setTarget(self.btnClick,self);
            self.skRightBtn.setTarget(self.btnClick,self);
            self._curTg = 0; //默认是第一页
            let len = routeConfs.length;
            self._maxTg = len-1;
            let imgGrp = self.skImgGrp;
            for(let i = 0;i<len;i++){
                let img = new cui.MenuItemImage();
                img.skinName = "menuItemSkin";
                img.tag = i;
                img.x = i*29;
                imgGrp.addChild(img);
            }
            imgGrp.width = 19*len + 10*(len-1);
            imgGrp.hCenter = 0-19;
            imgGrp.setTarget(self.clickMenu,self);
            imgGrp.selectTag = self._curTg;
            self.updateView();
        }
        private rmvInGrp(){
            let innerGrp = this.skInGrp;
            for(let i =0;i<innerGrp.numChildren;i++){
                (innerGrp.getChildAt(i) as cui.IBaseCtrl).dispose();  
            }
            innerGrp.removeChildren();
        }
        private btnClick(item:cui.ScaleButton){
            let self = this;
            let tag = item.tag;
            let curTg = self._curTg;
            if(tag == 0){ //点击了左边的页签
                if(curTg != 0){ //不是最左边
                    self._curTg --;
                    self.rmvInGrp();
                }
            }else{ //点击了右边的
                if(curTg != self._maxTg){ //不是最右边
                    self._curTg ++;
                    self.rmvInGrp();
                }
            }
            self.skImgGrp.selectTag = self._curTg;
        }
        private clickMenu(item:cui.MenuItemImage){
            let self = this;
            self.rmvInGrp();
            self._curTg = item.tag;
            self.updateView();
        }
        private updateView(){
            let self = this;
            let curTg = self._curTg;
            let routeInConf = self._routeInConfs[curTg];
            for (let key in routeInConf) {
                let ruleConf = routeInConf[key];
                if (ruleConf.isImg) {
                    let img = new cui.Image();
                    img.source = ruleConf.text;
                    img.x = ruleConf.x;
                    img.y = ruleConf.y;
                    self.skInGrp.addChild(img);
                } else {
                    let lab = new cui.Label();
                    lab.textFlow = cui.htmlParser.parser(ruleConf.text);
                    lab.x = ruleConf.x;
                    lab.y = ruleConf.y;
                    lab.lineSpacing = 5;
                    lab.textColor = ruleConf.color || 0xe0d5bd;
                    lab.size = ruleConf.size || 24;
                    self.skInGrp.addChild(lab);
                }
            }  
        }
    }
}