module game
{
    export class LoadingView extends UIFullFW
    {
        public slowSpeed:number;
        public fastSpeed:number;

        private _nextPer:number;
        private _curPer:number;
        private _showPer:number;
        private _speed:number;

        // private _msg:string;
        //private _loopAct:TRain.Action;

        public skBar:cui.ProgressBar;
        public skBarLab:cui.Label;
        public skLoadB:cui.Image;

        public skAniLogin:game.UIDBAni;
        public skImgLogin:cui.Image;
        // public skHead:cui.Group;
        // public skPer:cui.Label;

        constructor()
        {
            super();
            let self = this;
            self.slowSpeed = 0.0005;
            self.fastSpeed = 0.04;
            self._showPer = 0;
            self._nextPer = 0;
            self._curPer = 0;
            self.skinName = "loadingSkin"

            let loginNm = CONF.res[CONF.apkRes.login];
            self.skAniLogin.dbNm = self.skImgLogin.source = loginNm || "nover_login_bg";
        }

        protected onPartAdded():void
        {
            let self = this;
    		self.skBar.labelFunction = self.pbLabelFun.bind(self);

            //self.skBarLab.text = TRain.langMgr.getTxt("loginUI", "tip_" + Math.floor(Math.random()*13)+1);

            //self._stX = self.skHead.x;
        }

        protected getCloseAni(){
            return null;
        }

        protected getOpenAni(){
            return null;
        }

        protected onShow(){
            let self = this;
            TRain.core.addFrameDo(self.update, self);

            // let loopAct = self._loopAct;
            // if( !loopAct ){
            //     let action = new TRain.ActionPropTween( 1000, 1, {rotation:{b:0,r:357}} );
            //     loopAct = self._loopAct = new TRain.ActionLoop(action);
            // } 
            // TRain.actionMgr.addAction( loopAct, self.skBall, false );
        }

        protected onHide():void{
            let self = this;
            TRain.core.rmvFrameDo( self, self.update );
            //TRain.actionMgr.rmvAction( self._loopAct );
        }

		private pbLabelFun(val:number):string
        {          
            let self = this;
            //self.skHead.x = self._stX + Math.floor(self.skProBar.width * val);
            self.skBarLab.text = StringUtil.printf(TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.loadingLab),Math.floor(val * 100 ));
            self.skLoadB.x =  val * self.skLoadB.parent.width -(self.skLoadB.width * 0.5);
            return "";
        }

        protected onDispose():void
        {
            let self = this;
            TRain.core.rmvFrameDo( self, self.update );
            super.onDispose();
        }

        /**
         * totalper 为占100 的百分比 tm 预计时间 毫秒
         * */
        public setLoadStep( msg:string, totalper:number, tm:number ):void
        {
            let self = this;
            let nextPer = self._nextPer;
            if( nextPer >= 100 ) return;

            nextPer += totalper;
            if( nextPer >= 100 ) nextPer = 100;

            self._curPer = self._nextPer;
            self._nextPer = nextPer;
            //console.log( "nextPer=" + nextPer );

            self._speed = tm>0 ? totalper/tm : 0.01;

            // if( self._showPer < self._curPer )
            // {
            //     self._nextMsg = msg;
            // }
            // else
            // {
            //     self._msg = msg;
            // }
        }

        public isFinish():boolean
        {
            return this._showPer >= 100;
            //return true;
        }

        private update( tm:number ):void
        {
            let self = this;
            let showPer = self._showPer;
            if( showPer >= 100 )
            {
                TRain.core.rmvFrameDo( self, self.update );
                return;
            }

            let nextPer = self._nextPer;
            let newPer = showPer;
            if( showPer < self._curPer )
            {
                newPer += self.fastSpeed * tm;
            }
            else if( showPer < nextPer )
            {
                newPer += self._speed * tm;
            }
            else if( nextPer < 100 )
            {
                newPer += self.slowSpeed * tm;
            }

            if( newPer>=nextPer && nextPer<100 ){
                newPer = nextPer-0.1;
            }

            //console.log( "newPer=" + newPer );
            self._showPer = newPer;
            if( Math.floor(newPer) != Math.floor(showPer) )
            {
                // let msg = self._nextMsg;
                // if( msg && showPer>=self._curPer )
                // {
                //     self._msg = msg;
                //     self._nextMsg = null;
                // }
                // else
                // {
                //     msg = self._msg;
                // }
                //if(!msg) msg = "";

                self.skBar.value = newPer/100; 
            }
        }
    }
}