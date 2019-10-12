module game
{

    export interface IListen
    {
        once:boolean;
        tar:any;
        fun:(param1?:any,param2?:any)=>void;
    }

    export const enum Noti_G_EVT{
        JS_ERR = 'jserr'
    }

    export class Notification{
        private static _frees:IListen[] = [];
        public static getListen():IListen{
            let frees = Notification._frees;
            if( frees.length>0 ) return frees.pop();

            return {once:false, tar:null, fun:null};
        }

        public static freeListen( data:IListen ):void{
            data.tar = null;
            data.fun = null;
            Notification._frees.push(data);
        }

        private _listens:{[key:string]:IListen[]} = {};
    
        public hasListener( evt:string, tar?:any ):boolean{
            let listens = this._listens[evt];
            if( listens ) {
                for ( let i=listens.length-1; i>=0; --i ){
                    let listen = listens[i];
                    if( !listen.tar ){
                        listens.splice( i, 1 );
                        Notification.freeListen(listen);
                    }
                    else{
                        if( !tar || listen.tar==tar ) return true;
                    }
                }
            }
            return false;
        }

        public addListener( evt:string, fun:(param1?:any,param2?:any)=>void, tar:any, once?:boolean ):void{
            
            if( DEBUG ) {
                //egret.log( target.__class__ + "  add  Observer  " + key );
            }

            let allListens = this._listens;
            let listens = allListens[evt];
            if( !listens ){
                listens = allListens[evt] = [];      
            }
            else{
                if( DEBUG ){
                    for (let i = 0, n = listens.length;i < n;i++){
                        let temp = listens[i];
                        if(temp.tar == tar && temp.fun==fun){
                            egret.log( tar.__class__ + "  error:  add  Observer " + evt + " already is exist!" );
                        }
                    }
                }
            }

            let data = Notification.getListen();
            data.tar = tar;
            data.fun = fun;
            data.once = once;

            listens.push( data );
        }


        public rmvListener( evt:string, target:any ):void{
            let listens = this._listens[evt];
            if( listens ){
                for (let i=0, n=listens.length;i < n;i++){
                    let listen = listens[i];
                    if( listen.tar == target ){
                        // if( DEBUG ){
                        //     egret.log( target.__class__ + "  remove  Observer  " + evt );
                        // }

                        listen.tar = null;
                        listen.fun = null;
                        break;
                    }
                }
            }
        }

        public rmvAllListener( target?:any ): void{
            let list = this._listens;
            if( target ){
                for( let key in list ){
                    let listens = list[key];
                    for (let i=0, n=listens.length;i < n;i++){
                        let listen = listens[i];
                        if( listen.tar == target ){
                            listen.tar = null;
                            listen.fun = null;
                        }
                    }
                }  
            }
            else{
                this._listens = {};
                
                for( let key in list ){
                    let listens = list[key];
                    for (let i=0, n=listens.length;i < n;i++){
                        Notification.freeListen( listens[i] );
                    }
                }  
            }
        }

        public delayPostEvent( key:string, delay:number, param1?:any, param2?:any ){
            let self = this;
            TRain.core.addDelayDo( self.postEvent, self, delay, DelayFlag.normal, false, key, param1, param2 );
        }

        public postEvent( key:string, param1?:any, param2?:any ):void{
            let listens = this._listens[key];
            if( listens ){
                for (let i = listens.length-1; i>=0 ; --i ){
                    let listen = listens[i];
                    if( !listen.tar ){
                        listens.splice( i, 1 );
                        Notification.freeListen(listen);
                    }
                    else{
                        listen.fun.call( listen.tar, param1, param2 );
                        if(listen.once){
                            listens.splice( i, 1 );
                            Notification.freeListen(listen);
                        }
                    }
                }
            }
        }
    }

    export let notifiCenter = new Notification();

    URLUtil.setGlobal( "onerror", function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj){
        let args = [errorMessage,errorObj.stack];
        notifiCenter.postEvent( Noti_G_EVT.JS_ERR, args );
    });
}

