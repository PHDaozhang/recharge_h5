module game
{
    /**
     * 界面窗口基类，此类界面必须使用open接口来打开。
     *
     * */
    export class UIFWBase extends cui.Component
    {
        protected _aniWrap:TRain.AniWrapper;

        private _openData:any; //
        

        public dispose():void
        {
            let self = this;
            if( self._disabled ) return;

            let container = self.parent;
            if( container ){
                container.removeChild( self );
            } 

            let aniWrap = self._aniWrap;
            if( aniWrap ) {
                TRain.WrapperMgr.freeWrapper(aniWrap);
                self._aniWrap = null;
            }
            self.stopOpen();

            self.onDispose();
        }
        protected onDispose(){
            super.dispose();
        }

        private stopOpen():void{
            let self = this;
            if( self._openData ){
                self._openData = null;
                TRain.core.rmvDelayDo(self._open, self);
            }
        }

        public open( parent:egret.DisplayObjectContainer, data?:any, fin?:(ui:UIFWBase)=>void, tar?:any ):void{
            let self = this;
            self._openData = {fin:fin, tar:tar, p:parent, data:data};
            //self._tm = egret.getTimer();
            
            let needRess = self.getNeedRes();
            if( needRess && needRess.length>0 ){
                self.loadFWRes( needRess );
            }
            else{
                TRain.core.addDelayDo(self._open, self, 0);
            }
        }

        public close():void{
            let self = this;
            self.stopOpen();
   
            if( self.parent ){
                let ani = self.getCloseAni();
                if( ani ){
                    self.startAni(ani, self.closeImpl, self);
                }
                else{
                    self.closeImpl();
                }
            }
        }

        public isOpened():boolean{
            return !!this.parent;
        }

        private _open():void{
            let self = this;
            
            let openFinData = self._openData;
            self._openData = null;

            let parent = openFinData.p;
            if( parent ) parent.addChild( self );

            let finFun = openFinData.fin;
            if( finFun ){
                finFun.call( openFinData.tar, self );
            }
            self.openImpl( openFinData.data );

            let ani = self.getOpenAni();
            if( ani ) self.startAni( ani );
        }

        /**
         * 
         * @param data 界面重新显示时， data为空
         */
        protected openImpl( data?:any ):void{

        }

        protected closeImpl():void{
            let self = this;
            let parent = self.parent;
            if( parent ){
                parent.removeChild( self );
            }
        }

        //-------------------- 动画
        protected _clsAni:TRain.AniBase;
        protected getCloseAni():TRain.AniBase{
            let ani = this._clsAni;
            if( !ani ) {
                ani = this._clsAni = new CloseFWAni( this );
            }
            return ani;
        }

        protected _openAni:TRain.AniBase;
        protected getOpenAni():TRain.AniBase{
            let ani = this._openAni;
            if( !ani ) {
                ani = this._openAni = new OpenFWAni( this );
            }
            return ani;
        }

        protected startAni( ani:TRain.AniBase, fin?:Function, tar?:any ){
            let self = this;
            let wrapper = self._aniWrap;
            if( wrapper ){
                if( wrapper ) wrapper.stop();
            }
            else{
                wrapper = self._aniWrap = TRain.WrapperMgr.getWrapper();
            }

            wrapper.ani = ani;
            wrapper.start( fin, tar );
        }

        //------------------------------------------------------

        /**
         * 添加到舞台后且构建完成后调用
         * */
        protected onShow( stage:egret.Stage ):void {
        }
        /**
         * 移除舞台后触发
         * */
        protected onHide():void {
        }

        public $onAddToStage(stage:egret.Stage, nestLevel:number):void{
            super.$onAddToStage(stage, nestLevel);

            this.onShow( stage );
        }

        public $onRemoveFromStage():void{
            super.$onRemoveFromStage();

            this.onHide();
        }

        private loadFWRes( needRess:{res:string,tp?:string}[] ):void{
            let self = this;
            notifiCenter.addListener( ResMgr_EVT.LINE_LOAD_FIN, self.onLoadFin, self, true  );

            for( let needRes of needRess ){
                let tp = needRes.tp;
                resMgr.lineLoad( needRes.res, !!tp, tp );
            }
        }

        protected getNeedRes():{res:string,tp?:string}[]{
            let ret:{res:string,tp?:string}[]
            let needRess = this._needRess;
            if( needRess && needRess.length>0 ){
                ret = [];
                while( needRess.length>0 ){
                    let needRes = needRess.pop();
                    let idx = needRes.lastIndexOf( "#" );
                    if( idx>0 ){
                        let name = needRes.substring(0, idx);
                        let tp = needRes.substr(idx+1);
                        switch( tp ){
                            case TRain.RES_TYPE.FONT:
                                name = CONF.fontUrl + name + "." + tp; break;
                            case TRain.RES_TYPE.SHEET:
                                name = CONF.sheetUrl + name + "." + tp; break;
                            default:
                                tp = null;break;
                        }
                        ret.push( {res:name,tp:tp} );
                    }
                    else{
                        ret.push({res:needRes});
                    }
                }
            }
            return ret;
        }

        protected onLoadFin(){
            let self = this;
            if( self.disposed || !self._openData ) return;

            TRain.core.addDelayDo(self._open, self, 0);
        }
    }
}
