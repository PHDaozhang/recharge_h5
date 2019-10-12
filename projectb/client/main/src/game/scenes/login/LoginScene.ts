module game
{
    export const enum LoginNavType
    {
        kLoginAccount = 0,
        kLoginLayer = 1,
        kLoginServer = 2,
        kLoginCreate = 3,
    }

    export interface ICreateDelegate
    {
        onCreateFin(job:number,sex:number):void
    }

    export interface LoginDelegate
    {
        showView( page:LoginNavType, data?:any );
    }

    export class LoginScene extends BaseScene implements LoginDelegate, LayerDelegate
    {
        //-------- skin控件
        private _platStartup:boolean;//平台管理是否已启动

        private _curView:UIFWBase;
        constructor()
        {
            super();
          
            let self = this;

            //启动平台管理
            // notifiCenter.addListener( AccountMgr_EVT.startup, self.onPlatStartup, self, true );
            // AccountMgr.startup();
            self.startLogin();
        }

        protected childrenCreated():void
        {
            super.childrenCreated();
            let self = this;
            // let loginBg = new cui.Image();
            // loginBg.source = "newbg";
            // self.addChild(loginBg);
    
            BusyLayer.getInst().setParent( self );
            HttpUtil.busyUI = BusyLayer.getInst();

            let layer = new cui.Group();
            layer.hitCheckBound = false;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.tag = 1;

            BoxMgr.setParent(layer, self);

            layer = new cui.Group();
            layer.touchEnabled = false;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.tag = 1;

            TipsMgr.setParent(layer, self);

            if( self._platStartup ){
                self.startLogin();
            }
        }

        //启动流程 出现界面---平台/内部登录---获取自己登录过服务器列表 ---（可选）选服界面时获取全部服务器列表
        private startLogin():void
        {
            let self = this;
            self.showView(LoginNavType.kLoginAccount);
            // notifiCenter.addListener( UserMo_EVT.no_user, function(){
            //     self.showView( LoginNavType.kLoginCreate );
            // }, self, true );

            // let platMo = dataMgr.platMo;
            // platMo.addListener(PlatMo_EVT.got_my_entrys, self.onMySvrFin, self, true);
            // if(AccountMgr.inner)
            // {
            //     self.showView(LoginNavType.kLoginAccount);
            // }
            // else
            // {
            //     if(!AccountMgr.isLogined){
            //         AccountMgr.login();
            //     }
            //     else{
            //         if( !dataMgr.platMo.syncMyEntrys() ){
            //             self.onMySvrFin();
            //         }
            //     }
            // }
        }

        public dispose():void
        {
            let self = this;
            if(!self._inited || self.disposed)
            {
                return;
            }

            let curView = self._curView;
            if( curView ){
                curView.dispose();
            }

            BoxMgr.setParent(null, null);
            TipsMgr.setParent(null, null);
            BusyLayer.getInst().setParent( null );
            notifiCenter.rmvAllListener( self );
            super.dispose();
        }

        //-----------------------------------------------------------------------------

        public showView(page:LoginNavType):void
        {
            let self = this;
            let uiView:UIFWBase;
            switch (page)
            {
                case LoginNavType.kLoginAccount:
                    uiView = new LoginAccount();
                    break;
                case LoginNavType.kLoginLayer:
                    uiView = new LoginLayer();
                    break;
                case LoginNavType.kLoginServer:
                    uiView = new LoginServer();
                    break;
                case LoginNavType.kLoginCreate:
                    uiView = new CreateRole();
                    break;
            }

            (<any>uiView).delegate = self;
            uiView.open(self, null, self.onNormalOpen, self);
        }

        private onNormalOpen(uiView:UIFWBase):void
        {
            let self = this;
            let popView = self._curView;
            if(popView)
            {
                popView.dispose();
                self._curView = null;
            }
            self._curView = uiView;
        }

        public showLayer( layer:cui.Group ):void
        {
            this.addChild( layer );
        }

        public hideLayer( layer:cui.Group ):void
        {
            this.removeChild( layer );
        }
    }
}

        