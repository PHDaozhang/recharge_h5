

/**
 *  注：游戏必须全部包在GMD_xxx模块内
 * GMD_xxx 必须实现接口
 * {
 *  init():void; //游戏初始化  大厅调用  一生只调用一次
 *  start(data?:{inGame:boolean}):void;  //游戏开始  大厅调用
 *  end():void;  //游戏结束  游戏主动调用
 *  onReConnect():void; //断线重连时 调用
 *  close():void; //预留接口  大厅处理完 游戏结束 后调用
 * }
 * */
module GMD_xxx{

    /**
     * 游戏UI 标识  scene显示界面时使用
     * tag 需要大于1000
     */
    export const enum GameUITag{
    }

    /**
     * 用于显示界面  弹出界面  全屏特效 等公用公能 */
    export let scene:game.IScene;

    //当前是否 激活状态
    export let isActive:boolean;

    //----------------------- 游戏必须有的接口 ----- start
    export function init():void{
        scene = game.gameScene;

        gameDataMo = new GameDataModel();

        //处理 配置 语言包
        let resName = "xxxLang";
        let resData = RES.getRes( resName );
        if( resData )
        {
            TRain.langMgr.addGps( resData );
            RES.destroyRes( resName );
        }

        resName = "xxx";
        resData = RES.getRes( resName );
        if( resData )
        {
            gameDataMo.initConf( resData );
            RES.destroyRes( resName );
        }
    }

    /**
     * 
     * @param data   当data有值  且inGame=true 表示当前正在游戏中
     */
    export function start( data?:{inGame:boolean}  ):void{
        //处理 protobuf
        game.Protobuf.addDecodeProtos( XXX_NET_CONF.s2cDecode, XXX_NET_CONF.typeDecode );
        game.Protobuf.addEncodeProtos( XXX_NET_CONF.c2sEncode );

        // let ingame = data ? data.inGame : false;
        // if ( ingame )
        // {//玩家已经登陆游戏中了
        //     //如果 有 check_state 消息，则先获得游戏状态.再按状态做对应处理
        //     //如果 没有 check_state 消息，则直接去获得场景信息,再处理该信息
        // }
        // else
        // { 
        //     //显示房间列表界面　
        // } 

        gameDataMo.regHandler();
        showUI( data );

        isActive = true;
        let stage = TRain.core.stage;
        stage.addEventListener(egret.Event.ACTIVATE, onActive, self);
        stage.addEventListener(egret.Event.DEACTIVATE, onDeactive, self);
    }

    export function onReConnect():void{
		//断线重连时  被调用
    }

    export function end():void{ 
        let stage = TRain.core.stage;
        stage.removeEventListener(egret.Event.ACTIVATE, onActive, self);
        stage.removeEventListener(egret.Event.DEACTIVATE, onDeactive, self);

        hideUI();
        gameDataMo.unRegHandler();
        
        //处理 protobuf
        game.Protobuf.rmvDecodeProtos( XXX_NET_CONF.s2cDecode, XXX_NET_CONF.typeDecode );
        game.Protobuf.rmvEncodeProtos( XXX_NET_CONF.c2sEncode );

        game.gameScene.endGame();
    }

    export function close(){
        
    }

    //----------------------- 游戏必须有的接口 ----- end
	//只有在有牌路数据的时候才用
    function onActive():void{
		//窗口（浏览器）由最小化恢复时  被调用
        isActive = true;
		//game.dataMgr.gsMo.startConn(); //只有在选场界面才需要重新连接状态服
    }

    function onDeactive():void{
		//窗口（浏览器）最小化时  被调用
        isActive = false;
		//game.dataMgr.gsMo.endConn();	
    }

    //------------------------------------- ui -------------------------------------
	//需要初始化的ui界面
    function showUI( data:any ):void{
        scene.showGameUI( 1000, XxxFrame, false );
    }
	//关闭ui界面
    function hideUI():void{
    
    }
}