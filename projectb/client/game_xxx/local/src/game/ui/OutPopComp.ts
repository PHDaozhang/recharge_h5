module GMD_bjl{
    export class OutPopComp extends game.OutGameList{
        private _isOut:boolean;
        constructor(){
            super(false); //是否是纯净模式
            let self = this;
            self._isOut = true;
            self.perHeight = 100;
            self.perWidth = 100;
            self.touchThrough = true;
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skBackPure.setTarget(function(){
                _dataModel.askLeave();
            },self);
            self.skRulePure.setTarget(function(){
                _scene.openPopup(new HelpView());
            },self);
            self.skBtn.setTarget(self.clickBtn,self);
            self.skClose.setTarget(self.clickBtn,self);
        }
        public clickBtn(){
            let self = this;
            let out = self._isOut;
            self.skBtn.icon = !out ? confConsts.ComResTp.pull_on : confConsts.ComResTp.pull_off;
            self.skGroup.visible = out;
            self.skClose.visible = out;
            self._isOut = !out;
            _PlayMainSound(1);

        }
    }
}