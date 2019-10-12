module game {
    export class RuleView extends UIPopup {
        public skClose: cui.ScaleButton;
        public skGrp: cui.Group;
        public skInGrp: cui.Group;
        public skBtnGrp: cui.MenuGroup;
        private _ruleConfs: any[];
        constructor(ruleConfs: any[], skin?: string) {
            super();
            let self = this;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.useOnce = false;
            self.skinName = skin || "RuleSkin";
            self._ruleConfs = ruleConfs;
        }
        protected childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skClose.setTarget(self.close, self);
            //self.updateView(self._ruleConfs[0]);
            if(self.skBtnGrp == null){
                self.updateView(self._ruleConfs);
            }else{
                self.skBtnGrp.setTarget(self.menuClick, self);
                self.skBtnGrp.selectTag = 0;
            }
        }
        private rmvInGrp(){
            let innerGrp = this.skInGrp;
            for(let i =0;i<innerGrp.numChildren;i++){
                (innerGrp.getChildAt(i) as cui.IBaseCtrl).dispose();  
            }
            innerGrp.removeChildren();
        }
        private updateView(confs: any) {
            let self = this;
            self.rmvInGrp();
            let maxHeight: number = 0;
            let addH:number = 90;
            for (let key in confs) {
                let ruleConf = confs[key];
                if (ruleConf.isImg) {
                    let img = new cui.Image();
                    img.source = ruleConf.text;
                    img.x = ruleConf.x;
                    img.y = ruleConf.y;
                    self.skInGrp.addChild(img);
                    if (maxHeight < img.y){
                        maxHeight = img.y;
                        if(ruleConf.isLong && img.height > addH)addH = img.height;
                    } 
                } else {
                    let lab = new cui.Label();
                    let txt = ruleConf.text as string;
                    lab.textFlow = cui.htmlParser.parser(txt);
                    lab.x = ruleConf.x;
                    lab.y = ruleConf.y;
                    let size = lab.size = ruleConf.size || 30;
                    self.skInGrp.addChild(lab);
                    if (maxHeight < lab.y){
                        maxHeight = lab.y;
                        //获取\n的个数
                        let len = self.getTxtLen(txt,"\n"); // txt.match(/[\n]/g).length;
                        if(ruleConf.isLong && size *  len > addH)addH = size *  len;
                    } 
                }
            }
            self.skInGrp.width = self.skGrp.width;
            self.skInGrp.height = maxHeight + addH;
            //self.skInGrp.cacheAsBitmap = true;
            self.skGrp.setContentSize(self.skGrp.width, maxHeight + addH);
        }
        //获取\n出现的次数
        private getTxtLen(str:string,flagStr:string):number{
            var newStr = str.replace(new RegExp(flagStr,"g"),"");
            var count = (str.length-newStr.length) / flagStr.length;
            return count;
        }
        private menuClick(item: cui.MenuItemImage): void {
            let self = this;
            let tag = item.tag;
            self.updateView(self._ruleConfs[tag]);
        }
    }
}