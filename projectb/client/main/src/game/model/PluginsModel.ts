module game {
    export interface IPluginModule{
        init():void;
        start(data):void;
        end():void;
        //onReConnect():void;
        close():void;
    }

    type Info = {
        id:number;
        conf:GmdConf;
        inited:boolean;
        gm?:IPluginModule;
        data?:any;
        theme?:boolean;
        res?:boolean;
        gp?:boolean;
        ver?:boolean;
        jsVer?:string;
    }

    const enum PluginStrConst{
        HEAD = "PLUGIN_",
        RES_HEAD = "res_",
        THEME_HEAD = "theme_",
        WEBVER_HEAD = "webver_",
    }

    export class PluginsModel extends DataModel{
        //public path:string;//游戏目录

        private _conf:{[key:string]:any};
        private _list:{[key:string]:Info};

        constructor(){
            super();
            let self = this;
            self._list = {};
            self.confNm = "conf";
        }

        public onLoadConf( data:any ):void
        {
            let self = this;
            self.confLoaded = true;
            self._conf = data.plugins;
        }
        
        public start( id:confConsts.PluginsTp, data?:any ):boolean{
            let self = this;
            let conf = self._conf[id];
            if( !conf ){
                self.postEvent( GameMo_EVT.start_fin, "conf not find, id="+ id );
                return;
            }
            
            let pluginInfo = self._list[id];
            if( !pluginInfo ){
                pluginInfo = self._list[id] = {id:id, conf:conf, inited:false};
                let gmdNm = PluginStrConst.HEAD + conf.file;
                pluginInfo.gm = URLUtil.getGlobal( gmdNm );
            }

            pluginInfo.data = data;

            if( DEBUG ){
                pluginInfo.ver = true;
                self.loadGMD( pluginInfo );
            }
            else{
                self.loadVer( pluginInfo );
            }
        }

        //
        public stop( id:confConsts.PluginsTp ):void{
            let self = this;
            let pluginInfo = self._list[id];
            if( !pluginInfo ){
                console.error("unplug id["+id+"] error!");
                return;
            }
            TRain.core.rmvDelayDoByFlag(id);
            TRain.actionMgr.rmvActsByTag(id);
            //TRain.UITheme.setCurGp(null);
            pluginInfo.gm.close();
        }


        //-------------------------------------------------- load ------------------------------------------------
        private loadGMD( curGMD:Info ):void {
            let self = this;
            if( !curGMD.gm ){
                self.loadJs( curGMD );
            }
            if( !curGMD.res ){
                self.loadRes( curGMD );
            }
            if( !curGMD.theme ){
                self.loadTheme( curGMD );
            } 
            self.tryLoadFin(curGMD);
        }

        private loadJs( curGMD:Info ):void {
            let self = this;
            let gmdConf = curGMD.conf;

            let srcPath:string;
            if( curGMD.jsVer ){
                srcPath = gmdConf.file + "_" + curGMD.jsVer;     
            }
            else{
                srcPath = gmdConf.file;
            }

            URLUtil.loadScript( srcPath + ".js", function(){
                let gmdNm = PluginStrConst.HEAD + gmdConf.file;
                let gm = URLUtil.getGlobal( gmdNm );
                if( gm ){
                    curGMD.gm = gm;
                    self.tryLoadFin(curGMD); 
                }
                else{
                    self.postEvent( GameMo_EVT.start_fin, "plugin object not find name=" + gmdConf.file );
                }
            } )
        }

        private loadRes( curGMD:Info ):void {
            let self = this;
            let gmdConf = curGMD.conf;

            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function(){
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, <any>arguments.callee, self);

                curGMD.res = true;
                self.tryLoadFin(curGMD);  
            }, self);
    
            let resUrl = PluginStrConst.RES_HEAD +  gmdConf.file + "." + TRain.RES_TYPE.JSON;
            //resUrl = (RES.getVersionController() as TRain.WebVerController).getVirtualUrl(resUrl);
            RES.loadConfig( resUrl, "" );
        }

        private loadTheme( curGMD:Info ):void {
            let self = this;
            let gmdConf = curGMD.conf;

            let resUrl = PluginStrConst.THEME_HEAD +  gmdConf.file + "." + TRain.RES_TYPE.JSON;
            resMgr.loadConf(resUrl, function( data:any ){
                curGMD.theme = true;
                TRain.UITheme.addSkinConf( data, gmdConf.file );
                self.tryLoadFin(curGMD);  
            }, self, true );
        }

        private loadVer( curGMD:Info ):void {
            let self = this;
            let gmdConf = curGMD.conf;
            
            let cb = function(event:egret.Event):void {
                if (event.type == egret.Event.COMPLETE) {
                    let request:egret.HttpRequest = <egret.HttpRequest> (event.target);
                    let data = JSON.parse(request.response);
                    curGMD.ver = true;
                    if( data.js ){
                        curGMD.jsVer = data.js;
                        delete data.js;
                    }
                    (RES.getVersionController() as TRain.WebVerController).addWebVer(data);

                    self.loadGMD( curGMD ); 
                }
            }

            let request:egret.HttpRequest = new egret.HttpRequest();
            request.addEventListener(egret.Event.COMPLETE, cb, self);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, cb, self);

            request.responseType = egret.HttpResponseType.TEXT;
            request.open( PluginStrConst.WEBVER_HEAD +  gmdConf.file + ".ver?v=" + Date.now() );
            request.send();
        }

        private loadGroup( curGMD:Info ):void{
            let self = this;
            let gmdConf = curGMD.conf;
            let cb = function( event:RES.ResourceEvent ){
                if( event.groupName == gmdConf.file ){
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb, self);

                    curGMD.gp = true;
                    self.loadFin(curGMD); 
                } 
            };

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb, self);
            RES.loadGroup( gmdConf.file );
        }

        private tryLoadFin( curGMD:Info ):void{
            let self = this;
            if( curGMD.gm && curGMD.res && curGMD.theme && curGMD.ver ) {
                if( !curGMD.gp ){
                    self.loadGroup( curGMD );
                }
                else{
                    self.loadFin(curGMD);
                }
            }
        }

        private loadFin(curGMD:Info ):void{
            let self = this;
            if( curGMD.gp ) {
                let gmdConf = curGMD.conf;
                dataMgr.accMo.gameId = gmdConf.id;

                if( !curGMD.inited ){
                    curGMD.gm.init();
                    curGMD.inited = true;
                }
                
                TRain.UITheme.setCurGp( gmdConf.file );
                curGMD.gm.start(  curGMD.data  );
                self.postEvent( GameMo_EVT.start_fin );
            }
        }
    }
}