module game{

    // dbMgr.createArmAsync( "aaa", function(arm:dragonBones.EgretArmatureDisplay, skinName:string){
    //     arm.x = 200;
    //     arm.y = 200;
    //     arm.animation.play();
    //     self.addChild( arm );
    // }, self );

    export let dbMgr:DBoneManager;


    export class DBoneManager{
        public static resPath:string;

        //=====================================================================================
        private _factory:dragonBones.EgretFactory;//避免重名
        private _usecnts:any; //引用计数
        private _loadings:any;

        constructor()
        {
            let self = this;
            self._factory = dragonBones.EgretFactory.factory;
            self._usecnts = {};
            self._loadings = {};

            let p = dragonBones.EgretArmatureDisplay.prototype;
            let disposeFun = p.dispose;
            p.dispose = function(){
                dbMgr.onArmDispose( this );
                disposeFun.call( this );
            }
        }

        //---------------------------------- 使用计数 --------------------------------------------------
        private incUsecnt( skName:string ):void
        {
            let usecnts = this._usecnts;
            let val = usecnts[skName] || 0;
            usecnts[skName] = val + 1;
        }
        private decUsecnt( skName:string ):void
        {
            let usecnts = this._usecnts;
            let val = usecnts[skName] || 0;
            usecnts[skName] = val - 1;
        }

        //-------------------------------------------------------------------------------------
        public createArm( skName:string ):dragonBones.EgretArmatureDisplay
        {
            let self = this;
            let factory = self._factory;
            let dbDisply = factory.buildArmatureDisplay( skName, skName );
            if( dbDisply )
            {
                (<any>dbDisply).ud = skName;
                self.incUsecnt( skName );
                return dbDisply;
            }
            return null;
        }

        public createArmAsync( skName:string, finBack:(arm:dragonBones.EgretArmatureDisplay,skName:string)=>void, thisObj:any ):void
        {
            let self = this;
            let arm = self.createArm( skName );
            if( arm )
            {
                TRain.core.addNextDo(finBack, thisObj, arm, skName);
                return;
            }

            self.loadResImpl( skName, function( succ:boolean, skName:string ){
                let arm = succ ? self.createArm( skName ) : null;
                finBack.call( thisObj, arm, skName );
            }, self );
        }

        public loadAnimate( skName:string, callback?:(succ:boolean,skName:string)=>void, thisObj?:any ):void
        {
            let self = this;
            let factory = this._factory;
            if( factory.getDragonBonesData(skName) )
            {
                if(callback)
                {
                    TRain.core.addNextDo(callback, thisObj, true, skName);
                }//已加载
                return;
            }

            self.loadResImpl( skName, callback, thisObj );
        }

        //-----------------------------------------------------------------------------------
        public getUrl( skName:string ):string
        {
            return DBoneManager.resPath + skName + ".db";
        }

        private loadResImpl( skName:string, callback?:(success:boolean, skName:string)=>void, thisObj?:any ):void
        {
            let self = this;
            let loadings = self._loadings[skName];
            if( loadings )
            {
                if( callback )
                {
                    loadings.push( {callback:callback, target:thisObj} );
                }
                return;
            }

            loadings = [];
            self._loadings[skName] = loadings;
            if( callback )
            {
                loadings.push( {callback:callback, target:thisObj} );
            }

            let url = self.getUrl( skName );
            TRain.assetMgr.getTex( url, function(data:any){
                self.onLoadResFin( data, skName );
            }, self, TRain.RES_TYPE.MC );
        }

        private onLoadResFin( data:TRain.TexData, skName:string ):void
        { 
            let self = this;
            let success = false;
            if( data ){
                success = true;
                let factory = self._factory;
                let conf = data.conf;
                factory.parseDragonBonesData( conf.ske, skName );
                factory.parseTextureAtlasData( conf.tex, data, skName );
            }

            let loadingList = self._loadings;
            let loadings = loadingList[skName];
            delete loadingList[skName];

            for( let i=loadings.length-1; i>=0; --i )
            {
                let loadData = loadings[i];
                loadData.callback.call( loadData.target, success, skName );
            }
        }


        //-----------------------------------------------------------------
        public onArmDispose( arm:dragonBones.EgretArmatureDisplay ):void
        {
            this.decUsecnt( (<any>arm).ud );
        }

        public doGC():void
        {
            let self = this;
            let usecnts = self._usecnts;

            let factory = self._factory;
            let delKeys = [];
            for( let skName in usecnts )
            {
                let usecnt = usecnts[skName];
                if( usecnt <= 0 )
                {
                    delKeys.push( skName );
                    let texData = factory.getTextureAtlasData( skName )[0];
                    if( texData )
                    {
                        factory.removeDragonBonesData( skName );
                        factory.removeTextureAtlasData( skName );
                        TRain.assetMgr.releaseTex( (<any>texData).renderTexture );
                    }
                }
            }

            if( delKeys.length>0 )
            {
                for( let i=0, n=delKeys.length; i<n; ++i )
                {
                    delete usecnts[delKeys[i]];
                }
            }
        }
    }
}
