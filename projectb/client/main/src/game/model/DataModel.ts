module game
{
    export interface IMsgPrompt{
        showErr( errCode:number );//服务器错误
        showPrompt( errCode:number );//客户端错误
    }

    export let msgPrompt:IMsgPrompt = { 
        showErr:function(errCode:number){ console.log("errCode=" + errCode) },
        showPrompt:function(errCode:number){ console.log("promptCode=" + errCode) },
    };

    /**
     *
     * 数据类基类，内含有本地配置表数据_configData 和 服务器下发数据 _svrData。
     * 对数据操作逻辑
     *
     * */
    export class DataModel extends Notification
    {
        public confLoaded:boolean; //配置是否加载
        public confNm:string;     //要使用的配置表名
        protected _data:any;       //服务器数据存储
        protected _lProps:(string|number)[];  // 监听的时间

        /**
         * 配置表加载完成后调用。再各自的数据类中解析客户端配置数据
         * */
        public onLoadConf( data:any ):void
        {
            let self = this;
            self.confLoaded = true;
        }

        public setData( data:any ):void
        {
            this._data = data;
        }

        public getData():any
        {
            return this._data;
        }

        public getVal(key:string|number):any
        {
            return this._data[key];
        }

        public addVal(key:string|number, val:number):any
        {
            return this._data[key] += val;
        }

        public setVal(key:string|number, val:any):any
        {
            let self = this;
            self._data[key] = val;
            
            let lProps = self._lProps;
            if( lProps ){
                let keyStr = key.toString();
                if(lProps.indexOf(keyStr)>=0) self.postEvent( keyStr, val );
            }
        }

        public updateData( newData:any ):void
        {
            let self = this;
            let curData = self._data;
            for(let key in newData){
                curData[key] = newData[key];
            }

            let lProps = self._lProps;
            if( lProps ){
                for( let i=0, n=lProps.length; i<n; ++i ){
                    let propKey = lProps[i];
                    let val = newData[propKey];
                    if( val !== undefined ){
                        self.postEvent( <string>propKey, val );
                    }
                }
            }
        }

        public addPropListener( propKey:string|number, fun:(param1?:any)=>void, tar:any ):void{
            let self = this;
            self.addListener( <string>propKey, fun, tar );
            let lProps = self._lProps;
            if( lProps ){
                if( lProps.indexOf(propKey)<0 ) lProps.push( propKey );
            }
            else{
                self._lProps = [propKey];  
            }
        }

        public rmvPropListener( propKey:string|number, tar:any ):void{
            let self = this;
            self.rmvListener( <string>propKey, tar );
            let lProps = self._lProps;
            if( lProps ){
                let idx = lProps.indexOf(propKey);
                if( idx>0 && !self.hasListener(<string>propKey) ){
                    lProps.splice( idx, 1 );
                }
            }
        }
    }
}


