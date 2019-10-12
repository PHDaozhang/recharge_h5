module game
{
    const enum TipsConst{
        //promptMaxLine = 3,
        showTm = 3000
    }

    // type PromptData = {
    //     tp:PropmtShowType,
    //     txt:string,
    //     tm:number,
    //     cantTouch:boolean;
    // }

    export module TipsMgr {
        let _parent:cui.Group;//父窗口
        let _delegate:LayerDelegate;

        //let _data:PromptData;
        let _promptGp:cui.Component;

        let _timerId:number;

        let _cantTouch:boolean;

        let _tm:number;
        let _txt:string;

        export function init(){
            _timerId = 0;
            _promptGp = new cui.Component();
            _promptGp.skinName = "TipPromptSkin";
            _promptGp.vCenter = 0;
            _promptGp.hCenter = 0;
        }

        export function setParent(parent:cui.Group, layerDelegate:LayerDelegate):void{
            if( _parent ){
                _parent.removeChild( _promptGp );
            }

            _parent = parent;
            _delegate = layerDelegate;

            if( parent ){
                parent.addChild( _promptGp );
            }
        }

        function close():void{
            _timerId = 0;
            if(_delegate )
            {
                _parent.touchEnabled = false;
                _delegate.hideLayer( _parent );
            }
        }

        function show(){
            if( _parent )
            {
                _parent.touchEnabled = !!_cantTouch;
                if(!_parent.parent) _delegate.showLayer( _parent );
            }
        }


        //--------------------------------- prompt -------------------------------------
        export function clear():void{
            if( _timerId ){
                TRain.core.rmvDelayDoByID( _timerId );
            }

            close();
        }
        export function clearWait():void{
            if( _timerId ){
                TRain.core.rmvFrameDoById( _timerId );
            }
            close();
        }
        function updateTm():void{
            _tm --;
            if(_tm >= 0){
                let label = (_promptGp as any).skTxt as cui.Label;
                let str = StringUtil.printf(_txt,_tm);
                label.textFlow = cui.htmlParser.parser(str) ;
                label.textColor = UIColor.white;
            }else{
                clearWait();
            }
        }
        /**
         * 
         * @param txt 文本
         * @param tm 延迟多久关闭
         * @param cantTouch 是否接受用的触摸事件
         */
        export function waitPrompt( txt:string, tm?:number, cantTouch?:boolean ):void{
            _cantTouch = cantTouch;

            _tm = tm;
            _txt = txt;
            let label = (_promptGp as any).skTxt as cui.Label;
            label.textColor = UIColor.white;
            if( !_timerId && !!tm){
                TRain.core.rmvFrameDo(TipsMgr,updateTm);
                let str = StringUtil.printf(_txt,_tm);
                label.textFlow = cui.htmlParser.parser(str) ;
                _timerId = TRain.core.addFrameDo( updateTm, TipsMgr,false, 1000 );
            }else{
                label.text = txt ;
            }
            show();
        }

        export function showPrompt( txt:string, color?:UIColor, tm?:number, cantTouch?:boolean,size?:number ):void{
            _cantTouch = cantTouch;

            tm = tm || TipsConst.showTm;
            if( !_timerId ){
                _timerId = TRain.core.addDelayDo( close, TipsMgr, tm );
            }
            else{
                TRain.core.adjustDelayTmByID( _timerId, tm );
            }

            color = color || UIColor.white;

            let label = (_promptGp as any).skTxt as cui.Label;
            label.size = size || 40;
            label.text = txt;
            label.textColor = color;

            show();
        }
    }
}