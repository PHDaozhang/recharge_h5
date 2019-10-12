module game{
    export class OutGameList extends cui.Component{
        public skClose:cui.SimpleButton;
        public skBackPure: cui.ScaleButton;
		public skRulePure: cui.ScaleButton;
		public skmusicPure: cui.ScaleButton;
        public skPure: cui.ScaleButton;
        public skDbImg:cui.Image;
        public skBtn:cui.ScaleButton;
        public skGroup:cui.Group;
        
        private _isPure:boolean; //是否有纯净功能
        constructor(isPure?:boolean){
            super();
            let self = this;
            self.skinName = "gameMenuListSkin";
            self._isPure = isPure || false;
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            let soundMo = dataMgr.soundMo;
            self.skDbImg.source = self._isPure ? confConsts.ComResTp.Popup01 : confConsts.ComResTp.Popup02 ;
            self.skPure.visible = self._isPure;
            let state = soundMo.getState();
            self.skmusicPure.icon = state ? confConsts.ComResTp.music : confConsts.ComResTp.notMusic ;
            self.skmusicPure.setTarget(function(){
                TRain.soundMgr.playSFX(confConsts.SoundTp.click);
                let curState = soundMo.getState();
                soundMo.setState(!curState);
                self.skmusicPure.icon = !curState ? confConsts.ComResTp.music : confConsts.ComResTp.notMusic ;
            },self);
        }
        
    }
}