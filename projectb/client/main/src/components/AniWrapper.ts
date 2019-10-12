module TRain{
    export class AniBase{
        public tar:any;
        public action:Action;
        protected _props:any;

        constructor( tar?:any ){
            this.tar = tar;
        }

        public setData(...args):void{

        }

        //动画开启前
        public beforeAni():void{
            let props = this._props;
            if( props ){
                let tar = this.tar;
                for( let key in props ){
                    props[key] = tar[key];
                }
            }
        }
        //动画结束前
        public endAni():void{
            let props = this._props;
            if( props ){
                let tar = this.tar;
                for( let key in props ){
                    tar[key] = props[key];
                }
            }
        }
        
        public clear():void{
            let self = this;
            self.endAni();
            self.action.clear();
            self.tar = null;
        }
    }

    export class AniWrapper{
        public inFree:boolean;
        public inAni:boolean;
        public ani:AniBase;

        private _seqAct:ActionSequence;
        private _acts:Action[];
        private _data:{fun:Function, tar:any};
        
        constructor(){
            let self = this;
            self.inAni = false;
 
            let actEnd = new ActionCallDo();
            actEnd.once = false;
            actEnd.setCall( self.actFin, self );
            self._acts = [null,actEnd];
            self._seqAct = new ActionSequence();
            self._data = {fun:null, tar:null};
        }

        public clear(){
            let self = this;
            if( self.inAni ){
                self._seqAct.stop(); 
                
                self.inAni = false;
                self.ani.clear();

                let data = self._data;
                data.fun = undefined;
                data.tar = undefined;
            }

            self._acts[0] = null;
            self.ani = null;
        }

        public start( finFun?:Function, tar?:any ){
            let self = this;
            let data = self._data;
            data.fun = finFun;
            data.tar = tar;

            let aniObj = self.ani;
            aniObj.beforeAni();
            let action = aniObj.action;
            let acts = self._acts;
            acts[0] = action;
            let seqAct = self._seqAct;
            seqAct.setActions( acts );
            TRain.actionMgr.addAction(seqAct, aniObj.tar, false);
            self.inAni = true;
        }

        public stop(){
            let self = this;
            if( self.inAni ){
                self._seqAct.stop();
                self.actFin( null, true );
            }  
        }

        protected actFin( tar:any, notDo:boolean ):void{
            let self = this;
            self.inAni = false;
            self.ani.endAni();
            let data = self._data;
            if( data.fun ) {
                if( !notDo ) data.fun.call( data.tar );

                data.fun = undefined;
                data.tar = undefined;
            }
        }
    }


    export module WrapperMgr{
        let _wraps:AniWrapper[] = [];
        export function getWrapper():AniWrapper{
            if( _wraps.length>0 ){
               let wrapper = _wraps.pop();
               if( DEBUG ) {
                   wrapper.inFree = false; 
               }
               return wrapper;
            } 

            return new AniWrapper();
        }

        export function freeWrapper( wrapper:AniWrapper ){
            if( DEBUG && wrapper.inFree ) egret.error( "wrapper already free" );
            wrapper.clear();
            wrapper.inFree = true;
            _wraps.push(wrapper);
        }
    }
}