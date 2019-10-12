

interface IMainDelegate extends egret.DisplayObjectContainer
{
    onGameShow():void;
}

interface IMainInfo
{
    svrData:any;
    svrInfo:any;
    loginInfo:any;
    platConf:any;
}

module AppDelegate
{
    export function run( main:IMainDelegate ):void
    {
        TRain.core.init( main.stage );
        TRain.mcMgr.init(["ui"], true);

        let gameMgr = game.gameMgr = new game.GameManager();
        gameMgr.begin( main );
    }
}


