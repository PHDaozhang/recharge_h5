module game{

    export const enum RouteLineMo_EVT{
        DATA_CHANGE = "d_change"
    }

    export class RouteLineModel extends Notification{
        //谁命中
        public history2Tp:(historyData:any)=>number;

        public tps:number[];
        public hits:number[][];//0表示命中 大于0 表示没命中局数

        private _historys:any[];

        private _maxRow:number;
        private _maxNHit:number;
        private _tpCnt:number;

        /**
         * 
         * @param tpCnt 类型数量
         * @param maxRow 最大局数
         * @param maxNotHit 最大未命中数
         */
        constructor( tpCnt?:number, maxRow?:number, maxHit?:number ){
            super();

            let self = this;
            self._historys = [];
            self.tps = [];
            self.hits = [];
            self._tpCnt = tpCnt || 8;
            self._maxRow = maxRow || 100;
            self._maxNHit = maxHit || 50;
        }

        public get historys():any[]{
            return this._historys;
        }

        //设置 将会重置数据
        public set historys( datas:any[] ){
            let self = this;
            self._historys = datas;

            self.tps.length = 0;

            let hits = self.hits;
            for( let i=0, len=hits.length; i<len; ++i ){
                CacheUtil.freeArr( hits[i] );
            }
            hits.length = 0;

            for( let i=0, len=datas.length; i<len; ++i ){
                let tp = self.history2Tp( datas[i] );
                self._addHistory( tp );
            }

            self.delayPostEvent( RouteMo_EVT.DATA_CHANGE, 0 );
        }

        public addHistory( data:any ){
            let self = this;
            let historys = self._historys;
            historys.push( data );
            if( historys.length>self._maxRow ){
                self._shiftHistory();
            }

            let tp = self.history2Tp( data );
            self._addHistory( tp );

            self.delayPostEvent( RouteMo_EVT.DATA_CHANGE, 0 );
        }

        private _addHistory( tp:number ){
            let self = this;
            let newRowDatas = CacheUtil.getArr();
            let hits = self.hits;
            newRowDatas[tp] = 0;

            let tpCnt = self._tpCnt;
            let row = hits.length;
            if( row>0 ){
                let maxNotHit = self._maxNHit;
                let lastRowDatas = hits[row-1];
                for( let i=0; i<tpCnt; ++i ){
                    if(i!=tp){
                        let lastHitCnt = lastRowDatas[i];
                        newRowDatas[i] = lastHitCnt<maxNotHit ? lastHitCnt + 1 : maxNotHit;
                    } 
                }
            }
            else{
                for( let i=0; i<tpCnt; ++i ){
                    if(i!=tp) newRowDatas[i] = 1;
                }
            }
            hits.push( newRowDatas );
            
            self.tps.push( tp );
        }

        private _shiftHistory(){
            let self = this;
            self._historys.shift();
            self.tps.shift();

            let tmpTps = CacheUtil.getArr();
            let i=0, len=0, j=0;
            let tpCnt = self._tpCnt;
            for( ; i<tpCnt; ++i ){
                tmpTps.push(i); 
            }

            let hits = self.hits;
            CacheUtil.freeArr( hits.shift() );
            for( i=0, len=hits.length; i<len; ++i ){
                let rowDatas = hits[i];
                for( j=tmpTps.length-1; j>=0; --j ){
                    let tp = tmpTps[j];
                    let hitTp = rowDatas[tp];
                    if(hitTp<=1){
                        tmpTps.splice(j,1);
                    }
                    else{
                        if(hitTp == self._maxNHit){
                            tmpTps.splice(j, 1);
                        }
                        rowDatas[tp] = hitTp-1;
                    }
                }
                if(tmpTps.length<=0) break;
            }

            CacheUtil.freeArr( tmpTps );
        }
    }
}