module GMD_xxx{

    export let gameDataMo:GameDataModel;

    export class GameDataModel extends game.DataModel{
        private _xxxConf:game.GmdConf;// 换成excel配置对应的类型

        //---------------------------- 配置  ------------------------------
        public initConf( data:any ){
            let self = this;
            self._xxxConf = data.gmd;//gmd 是excel配置的sheet名字
        }

        public getXxxConf(){
            return this._xxxConf;
        }

        public getData():XXX_NET_CONF.msg_account_info // 换成对应的对应数据的类型
        {
            return this._data;
        }

        //------------------------------------ c2s ----------------------------------
        // public changeHead( icon:string ){
        //     let args:XXX_NET_CONF.c2s_update_playerhead = <any>{};
        //     args.headStr = icon;
        //     Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_update_playerhead, args);
        // }
		//@param gameId 游戏id
		//@param roomId 房间id
		//进入游戏
        public enterGame(gameId:number,roomId:number){
            let args:NET_CONF.c2s_enter_game = <any>{};
            args.gameid = gameId;
            if(!!roomId){
                args.roomid = roomId;
            }
            game.Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_enter_game,args);
            game.Net.busyUI.showBusy();
        }
		//检查状态
        public checkState(){
            let args:xxx_NET_CONF.C2S_ROUTE_TP.c2s_check_state = <any>{};
            let net = game.Net;
            net.sendMsg(xxx_NET_CONF.C2S_ROUTE_TP.c2s_check_state,args); 
        }
		//获取房间信息
        public getRoomScene(){
            let args:xxx_NET_CONF.C2S_ROUTE_TP.c2s_get_room_scene_info = <any>{};
            let net = game.Net;
            net.sendMsg(xxx_NET_CONF.C2S_ROUTE_TP.c2s_get_room_scene_info,args); 
        }
        //离开游戏
        public leaveGame(){   
			let args:NET_CONF.c2s_leave_game = <any>{};
			game.Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_leave_game,args);
        }
        public  enter_game_result(data:NET_CONF.s2c_enter_game_result){
            let self = this;
            let result = data.result;
            if (result != langConsts.errCode.e_rmt_success)
            {
                game.Net.busyUI.hideBusy();
                self.leaveGame();
            }
            else
            {
                //检查游戏状态
                self.checkState();
            }
        }
        public  check_gameState_result(data:xxx_NET_CONF.s2c_check_state_result){
            let self = this;
            if(data.is_intable){
                self.getRoomScene();
            }else{
                game.Net.busyUI.hideBusy();
                self.leaveGame();
            }
        }    
        public  get_room_scene_info_handle(Info:xxx_NET_CONF.s2c_get_room_scene_info_result){
            game.Net.busyUI.hideBusy();
			//game.dataMgr.gsMo.endConn();
        }  
        //请求离开游戏返回
        public leaveGame_handle(data:NET_CONF.s2c_leave_game_result)
        {   
            let self = this;
            if(data.shutdown == false)
            {
                if(!self.inGame){//如果不是断线重连进来的
                    //弹出选择界面
                    //_scene.showGameUI(GameUITag.chooseRoom,JSYSGameList,false);
					//game.dataMgr.gsMo.startConn();
                }else{
                    end();
                    self.inGame = false;
                } 
            }
            _scene.homeUI.setNotifyParent(null);

        } 
        //------------------------------------- s2c -------------------------------------
        //注册游戏消息处理函数
        public regHandler(){
            let self = this;
            let net = game.Net;
			net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_enter_game_result,self.enterGameResult,self);
            net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_leave_game_result,self.leaveGameResult,self);
            //net.regHandle( NET_CONF.S2C_ROUTE_TP.s2c_update_playerhead_result, self.onHeadChange, self );
        }


        //注销游戏消息处理函数
        public unRegHandler(){
            let net = game.Net;
			net.unregHandle(NET_CONF.S2C_ROUTE_TP.s2c_enter_game_result);
            net.unregHandle(NET_CONF.S2C_ROUTE_TP.s2c_leave_game_result);
            //net.unregHandle( NET_CONF.S2C_ROUTE_TP.s2c_update_playerhead_result );
        }
        // private onHeadChange( data:NET_CONF.s2c_update_playerhead_result ){
        //     if ( data.result != langConsts.errCode.e_rmt_success )
        //     {
        //         msgPrompt.showErr( data.result );
        //     }
        //     else{
        //         this.setVal( "icon_custom", data.headstr );
        //     }
        // }

    }
}