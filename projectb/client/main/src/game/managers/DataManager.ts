/**
 * Created by wjdeng on 2015/9/2.
 */

module game {
    export let dataMgr: DataManager;

    export class DataManager {
        //--------------------------------------------------------------
        public preload: boolean;//预加载是否结束

        //初始化创建
        public accMo: AccountModel;

        public notifyMo: NotifyModel;
        public gameMo: GameModel;
        public soundMo: SoundModel;
        public generalMo: GeneralModel;
        public mailMo: MailModel;
        public activityMo: ActivityModel;
        public gsMo: GameStateModel;

        private _inited: boolean;
        //-------------------------  load confs  -----------------
        private _needLoads: DataModel[];  //key = Array<function>

        private _heartTag: number;

        //初始化创建
        constructor() {
            let self = this;

            self._needLoads = [];
            self.accMo = new AccountModel();

            self.accMo.addListener(AccountMo_EVT.login_svr_fin, self.startHeart, self);
            notifiCenter.addListener(CONN_EVT.CONN_CLOSE, self.stopHeart, self);

            self.notifyMo = new NotifyModel();
            self.soundMo = new SoundModel();
            self.mailMo = new MailModel();
            self.gsMo = new GameStateModel();
            self.createMo("gameMo", GameModel);
            self.createMo("generalMo", GeneralModel);
            self.createMo("activityMo", ActivityModel);
            //userMo ------放最后创建
            //self.createMo( "userMo", UserModel ); 
        }

        private createMo(name, modelCls: any): void {
            let model = <DataModel>(new modelCls());
            this[name] = model;

            if (model.confNm) {
                this._needLoads.push(model);
            }
        }

        public loadConfs(): void {
            let needLoads = this._needLoads;
            for (let i = 0, n = needLoads.length; i < n; ++i) {
                let model = needLoads[i];
                resMgr.loadConf(model.confNm, model.onLoadConf, model);
            }

            delete this._needLoads;
        }

        public init() {
            let self = this;
            if (!self._inited) {
                self._inited = true;
                self.gsMo.init();
            }
        }


        //-----------------------------------------------------
        private startHeart(): void {
            let self = this;
            if (!self._heartTag) {
                self._heartTag = TRain.core.addFrameDo(self.heartSync, self, false, 30000);//5秒
                Net.regHandle(NET_CONF.S2C_ROUTE_TP.g2c_heartbeat, function () {
                    //to do
                }, self);
                self.heartSync();
            }
        }

        public stopHeart(): void {
            let self = this;
            if (self._heartTag) {
                TRain.core.rmvFrameDoById(self._heartTag);
                self._heartTag = 0;
            }
        }

        private heartSync() {
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2g_heartbeat, {});
        }
    }
}
