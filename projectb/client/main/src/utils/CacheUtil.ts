module CacheUtil
{
    let _arrs:any[][] = [];
    export function getArr():any[]{
        return _arrs.length>0 ? _arrs.pop() : [];
    }

    export function freeArr( arr:any[] ){
        arr.length = 0;
        if( _arrs.length<100 ){
            _arrs.push( arr );
        }
    }
}