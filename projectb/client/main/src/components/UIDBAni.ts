module game
{
    export class UIDBAni extends cui.BaseContainer
    {
        //---------------------------------------------------------------------------------
        protected _arm:dragonBones.EgretArmatureDisplay;

        protected _playData:{ani?:string, times?:number, frame?:number, stopFrame?:number};

        protected _dbNm:string;

        public autoPlay:boolean = false;

        // constructor()
        // {
        //     super();

        //     let self = this;
        // }

        public $hitTest(stageX:number, stageY:number):egret.DisplayObject
        {
            return null;
        }

        public get dbNm():string
        {
            return this._dbNm;
        }

        public set dbNm( name:string )
        {
            let self = this;
            name = (!!name) ? name : null;
            if( self._dbNm == name ) return;

            self._dbNm = name;
            self.freeArm();
            if( self._inited ){
                self.loadData();
            }
        }

        protected childrenCreated():void
        {
            super.childrenCreated();

            this.loadData();
        }

        $onAddToStage(stage:egret.Stage, nestLevel:number):void
        {
            super.$onAddToStage(stage, nestLevel);

            let self = this;
            if( self._playData ){
                self._play();
            }
        }

        $onRemoveFromStage():void
        {
            super.$onRemoveFromStage();

            this._stop();
        }

        //------------------------------- load --------------------------------------
        //加载动画数据
        protected loadData():void
        {
            let self = this;
            let dbNm = self._dbNm;
            if( dbNm ){
                dbMgr.loadAnimate( dbNm, self.onLoadFin, self );
            }
        }

        protected onLoadFin( succ:boolean, skName:string ):void
        {
            if( !succ ) return;

            let self = this;
            let dbNm = self._dbNm;
            if( !dbNm || dbNm != skName ) return;
 
            let arm = self._arm = dbMgr.createArm( skName );
            arm.addDBEventListener( dragonBones.EventObject.COMPLETE, self.onAniFin, self );
            self.addChild( arm );

            if( !self._playData && self.autoPlay ){
                self._playData = {times:-1};
            }

            if( self._playData )
            {
                self._play();
            }
            
            self.dispatchEventWith( cui.UI_EVENT.EVT_CREATED, false );
            self.invalidateDL();
        }

        //---------------------------------------------------------------------
        
        public setSlotDisplay( nm:string, display:cui.IBaseCtrl ){
            // let slot = armature.getSlot("text");
            // slot.display = new yourEngine.TextField();
        }

        //---------------------------------------------------------------------
        //aniNm - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
        public play( aniNm?:string, playTimes?:number ):void
        {
            let self = this;
            if( aniNm && !self._playData ){
                self._playData = { ani:aniNm, times:playTimes };
            }
            self._play();
        }

        public gotoAndPlay( aniNm:string, frame?:number, playTimes?:number ):void
        {
            playTimes = playTimes || 0;
            frame = frame || 0;

            let self = this;
            self._playData = { ani:aniNm, times:playTimes, frame:frame };
            self._play();
        }

        private _play():void
        {
            let self = this;
            let arm = self._arm;   
            if( arm ){
                let playData = self._playData;
                if( playData.stopFrame ){
                    self._playData = null;
                    arm.animation.gotoAndStopByFrame( playData.ani, playData.stopFrame );
                }
                else{
                    if( playData.ani ){
                        arm.animation.gotoAndPlayByFrame( playData.ani, playData.frame, playData.times );
                    }
                    else{
                        arm.animation.play( playData.ani, playData.times );
                    }
                    
                }
            }
        }

        private _stop():void{
            let arm = this._arm;
            if(arm) {
                arm.animation.stop();
            }
        }

        public gotoAndStop( frame:number, aniNm?:string ):void
        {
            let self = this;
            self._playData = {ani:aniNm, stopFrame:frame};
            self._play();
        }

        public stop():void
        {
            let self = this;
            self._playData = null;
            self._stop();
        }

        protected onAniFin( e:any ):void
        {
            let self = this;
            self._playData = null;
            self.dispatchEventWith( cui.UI_EVENT.EVT_PLAY_FIN, false );
        }

        protected freeArm():void
        {
            let self = this;
            let arm = self._arm;
            if( arm ){
                self._arm = null;
                self.removeChild( arm );
                arm.dispose();
            }
        }
    }
}