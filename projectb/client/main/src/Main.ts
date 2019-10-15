//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer implements IMainDelegate
{
    private _initThemeFin:boolean;
    private _preLoadFin:boolean;
    private loadingView: LoadingUI;
    constructor(){
        super();

        let self = this;
        egret.TextField.default_fontFamily = "SimHei";
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB)
        {
            let webVerCtrl  = new TRain.WebVerController();
            RES.registerVersionController( webVerCtrl );

            //渲染模式
            let ranmode = egret.Capabilities.renderMode;
            let currRendMode:number = game.RenderModeTp.canvas;
            if(ranmode == "webgl")
            {
                currRendMode = game.RenderModeTp.webgl;
            }
            game.GameUtil.rm = currRendMode;
        }

        let os = egret.Capabilities.os;
        let currOS:game.CapabilityOS;
        switch( os )
        {
            case "iOS":
                currOS = game.CapabilityOS.iOS;
                break;
            case "Android":
                currOS = game.CapabilityOS.Android;
                break;
            case "Windows Phone":
                currOS = game.CapabilityOS.WinPhone;
                break;
            case "Windows PC":
                currOS = game.CapabilityOS.WinPC;
                break;
            case "Mac OS":
                currOS = game.CapabilityOS.MacOS;
                break;
            default :
                break;
        }
        game.GameUtil.os = currOS;

        //设置加载进度界面
        let loadingUI = self.loadingView = new LoadingUI();
        self.addChild(loadingUI);
        //初始化Resource资源加载库

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, self.onConfigComplete, self);
        RES.loadConfig("res.json", "");  
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void
    {
        let self = this;
        egret.updateAllScreens();
        RES.setMaxLoadingThread( 4 );
        RES.setMaxRetryTimes( 0 );

        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, self.onConfigComplete, self);
        self.loadThemeAndPre();
    }

    private loadThemeAndPre():void
    {
        let self = this;
        TRain.UITheme.loadInitConf( "theme.json", self.onThemeInitFin, self );

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onResourceLoadComplete, self);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onResourceLoadError, self);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
        RES.loadGroup("preload");
    }

    private onThemeInitFin( event:egret.Event ):void
    {
        let  self = this;
        self._initThemeFin = true;
        self.createScene();
    }
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        let self = this;
        if (event.groupName == "preload")
        {
            self._preLoadFin = true;
            self.createScene();
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private createScene(){
        let self = this;
        if(self._initThemeFin && self._preLoadFin)
        {
            AppDelegate.run( self );
        }
    }

    public onGameShow():void
    {
        let self = this;
        let loadingUI = self.loadingView;
        if( loadingUI )
        {
            self.removeChild( loadingUI );
            self.loadingView = null;
        }
        delete self._preLoadFin;
        delete self._initThemeFin;
    }
}
