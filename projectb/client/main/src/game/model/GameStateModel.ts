module game {
    

    export class GameStateModel {
        private _inConn:boolean;

        public init(){
            let self = this;
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_player_connect_result, function(data:NET_CONF.gs2c_player_connect_result){
                if( data.result == langConsts.errCode.e_rmt_success ){
                    self._inConn = true;
                    let accMo = dataMgr.accMo;
                    if( accMo.gameId ){
                        let args:NET_CONF.c2gs_game_history = {};
                        args.gameid = accMo.gameId;
                        Net.sendMsg( NET_CONF.C2S_ROUTE_TP.c2gs_game_history, args );
                    }
                }
            }, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_player_disconnect_result, function(data:NET_CONF.gs2c_player_disconnect_result){
                if( data.result == langConsts.errCode.e_rmt_success ) self._inConn = false;
            }, self); 
        }

        public startConn(): void {
            let accMo = dataMgr.accMo;
            if( accMo.gameId && !this._inConn ){
                let args:NET_CONF.c2gs_player_connect = {};
                args.playerid = accMo.getData().aid;
                args.gameid = accMo.gameId;
                Net.sendMsg( NET_CONF.C2S_ROUTE_TP.c2gs_player_connect, args );
            }
        }

        public endConn(): void {
            if( this._inConn ){
                let args:NET_CONF.c2gs_player_disconnect = {};
                args.playerid = dataMgr.accMo.getData().aid;
                Net.sendMsg( NET_CONF.C2S_ROUTE_TP.c2gs_player_disconnect, args );
            }
        }
        public restCoon():void{
            this._inConn = false;
        }
    }
}