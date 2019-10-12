module game
{
    export class EffectNode extends cui.Group
    {
        public useOnce:boolean; //只用一次

        protected _inPly:boolean;
        protected _cb:{fun:(tar:any)=>void, tar:any};
        constructor()
        {
            super();
            let self = this;
            self.useOnce = true;
            self.touchEnabled = false;
        }

        public setFinish(cb:(tar:any)=>void, tar:any):void
        {
            this._cb = {fun:cb, tar:tar};
        }


        public play():void
        {
            this._inPly = true;
        }

        protected aniFin():void
        {
            let self = this;
            let cbData = self._cb;
            if( cbData )
            {
                self._cb = null;
                cbData.fun.call( cbData.tar, self );
            }

            if( self.useOnce){
                self.dispose();
            }
            else{
                let parent = self.parent;
                if( parent ) parent.removeChild( self );
            }
        }

        public dispose():void{
            let self = this;
            let parent = self.parent;
            if( parent ) parent.removeChild( self );

            self._cb = null;

            super.dispose();
        }
    }

    export class ImgEffect extends EffectNode{
        protected _img:cui.Image;
        protected _aniTm:number;
        protected _tag:number;
        constructor( img:cui.Image, showTm:number ){
            super();

            let self = this;
            img.visible = false;
            self._img = img;
            self.addChild( img );
            self._aniTm = showTm;
        }

        public play(){
            super.play();

            let self = this;
            self._img.visible = true;
            self._tag = TRain.core.addDelayDo( self.aniFin, self, self._aniTm );
        }

        protected aniFin(){
            this._tag = 0;

            super.aniFin();
        }

        public dispose():void{
            let tag = this._tag;
            if( tag ){
                TRain.core.rmvDelayDoByID( tag );
            }
            super.dispose();
        }
    }

    export class ClipEffect extends EffectNode
    {
        protected _anitp:number;
        protected _clip:TRain.MovieClip;

        constructor( anitp:number, aniName:string )
        {
            super();

            let self = this;
            self._anitp = anitp;

            let clip = new TRain.MovieClip();
            self._clip = clip;
            clip.addEventListener( egret.Event.COMPLETE, self.aniFin, self );
            self.addChild( clip );

            let idx = aniName.indexOf( "." );
            if( idx<0 ){
                TRain.mcMgr.getMCDataAsync( anitp, aniName, self.onLoadDataFinish, self );
            }
            else{
                TRain.mcMgr.getMCDataAsync( anitp, aniName.substr(0,idx), self.onLoadDataFinish, self, aniName.substring(idx+1) );
            }      
        }

        protected onLoadDataFinish( clipData:TRain.MovieClipData, anitp:number ):void
        {
            let self = this;
            if( !clipData ){
                TRain.core.addDelayDo( self.aniFin, self, 500 );
                return;
            }

            let clip = self._clip;
            clip.movieClipData = clipData;
            if( self._inPly ){
                clip.gotoAndPlay( 0, 1 );
                TRain.mcMgr.add( clip );
            }
        }

        public play():void
        {
            super.play();

            let clip = this._clip;
            if( clip.movieClipData ){
                clip.gotoAndPlay( 0, 1 );
                TRain.mcMgr.add( clip );
            }
        }

        protected aniFin():void
        {
            let self = this;
            let clip = self._clip;
            clip.stop();
            TRain.mcMgr.remove( clip );

            super.aniFin();
        }

        public dispose():void{
            let self = this;
            let movieClipData = self._clip.movieClipData;
            if( movieClipData ){
                self._clip.movieClipData = null;
                TRain.mcMgr.freeMCData( self._anitp, movieClipData );
            }

            super.dispose();
        }
    }


    export class DBEffect extends EffectNode
    {
        protected _arm:dragonBones.EgretArmatureDisplay;
        protected _aniNm:string;
        protected _playTime:number;

        /**
         * - 播放指定动画。
         * @param name - 龙骨资源名字
         * @param aniNm - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
         * @param playTimes - 循环播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
         */
        constructor( name:string, aniNm?:string, playTime?:number )
        {
            super();

            let self = this;
            self._aniNm = aniNm;
            self._playTime = playTime || -1;
            dbMgr.createArmAsync( name, function(arm:dragonBones.EgretArmatureDisplay){
                if( self.disposed ) return;
                
                self._arm = arm;
                arm.addDBEventListener( dragonBones.EventObject.COMPLETE, self.aniFin, self );
                self.addChild( arm );
                if( self._inPly ){
                    arm.animation.play( self._aniNm, self._playTime );
                }
            }, self );
        }

        public play():void
        {
            super.play();

            let self = this;
            let arm = self._arm;
            if( arm ){
                arm.animation.play( self._aniNm, self._playTime );
            }
        }
    }

    export class EffectLayer extends cui.Group
    {
        public delegate:LayerDelegate;
        private _deque:Array<EffectNode> = new Array<EffectNode>();

        public dispose():void
        {
            let self = this;
            self.clearAll();
            self.delegate = null;
        }
        public isPlaying():boolean
        {
            let self = this;
            return self.numChildren>0 || self._deque.length>0;
        }

        public addEffect( node:EffectNode ):void
        {
            let self = this;
            if( self.numChildren<=0 )
            {
                self.showEffect( node );
            }
            else
            {
                self._deque.push(node);
            }
        }

        public showEffect(node:EffectNode):void
        {
            let self = this;
          
            node.play();
            self.addChild( node );
            self.touchEnabled = node.touchEnabled;
            if( self.delegate ) self.delegate.showLayer( self );    
        }

        public clearAll():void
        {
            let self = this;
            self._deque.length = 0;

            let children = self.$children;
            for( let i=0, n=children.length; i<n; ++i )
            {
                (<EffectNode>children[i]).dispose();
            }

            self.removeChildren();
        }

        $childRemoved(child:egret.DisplayObject, index:number):void
        {
            super.$childRemoved( child, index );

            let self = this;
            self.touchEnabled = false;
            TRain.core.addDelayDo(self.update, self, 0);
        }

        private update():void
        {
            let self = this;
            if( self.numChildren<=0 )
            {
                let deque = self._deque;
                let node:EffectNode;
                while( deque.length>0 ){
                    node = deque.shift();
                    if( !node.disposed ) break;

                    node = null;
                }

                if( node )
                {
                    self.touchEnabled = node.touchEnabled;
                    node.play();
                    self.addChild( node );
                }
                else
                {
                    if( self.delegate ) self.delegate.hideLayer( self );
                }
            }
        }
    }
}

