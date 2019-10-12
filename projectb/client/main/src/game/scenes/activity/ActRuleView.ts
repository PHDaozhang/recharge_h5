module game {
    export class ActRuleView extends UIPopup {
        public skClose: cui.ScaleButton;
        public skGrp: cui.Group;
        public skInGrp: cui.Group;
        constructor() {
            super();
            let self = this;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.useOnce = false;
            self.skinName = "actRuleSkin";
        }
        protected childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skClose.setTarget(self.close, self);
        }
        private rmvInGrp(){
            let innerGrp = this.skInGrp;
            for(let i =0;i<innerGrp.numChildren;i++){
                (innerGrp.getChildAt(i) as cui.IBaseCtrl).dispose();  
            }
            innerGrp.removeChildren();
        }
        public updateView(confs: any) {
            let self = this;
            self.rmvInGrp();
            let maxHeight: number = 0;
            let addH:number = 0;
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
                        addH = img.height;
                    } 
                } else {
                    let lab = new cui.Label();
                    lab.textFlow = cui.htmlParser.parser(ruleConf.text);
                    lab.x = ruleConf.x;
                    lab.y = ruleConf.y;
                    lab.size = ruleConf.size || 30;
                    self.skInGrp.addChild(lab);
                    if (maxHeight < lab.y){
                        maxHeight = lab.y;
                        //获取\n的个数
                        addH = 30 *  3;
                    } 
                }
            }
            self.skInGrp.width = self.skGrp.width;
            self.skInGrp.height = maxHeight + 90;
            //self.skInGrp.cacheAsBitmap = true;
            self.skGrp.setContentSize(self.skGrp.width, maxHeight + 90);
        }
    }
}