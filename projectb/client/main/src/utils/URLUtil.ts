
module URLUtil
{
    export function getLocationParam( key:string ):string
    {
        if ( !window.location ) return null;


        let search = location.search;
        if (search != "")
        {
            search = search.slice(1);
            let searchArr = search.split("&");
            let length = searchArr.length;
            for (let i = 0; i < length; i++)
            {
                let str = searchArr[i];
                let arr = str.split("=");
                if (arr[0] == key)
                {
                    return arr[1];
                }
            }
        }

        return null;
    }

    export function getLocationParams():{[key:string]:string}
    {
        let ret = {};
        if ( window.location ){
            let search = location.search;
            if (search != "")
            {
                search = search.slice(1);
                let searchArr = search.split("&");
                let length = searchArr.length;
                for (let i = 0; i < length; i++)
                {
                    let str = searchArr[i];
                    let arr = str.split("=");
                    ret[arr[0]]=arr[1];
                }
            }
        }
        return ret;
    }

    let _params:any;
    export function getWebParam( key:string ):any
    {
        if ( _params )
        {
            return _params[key];
        }

        _params = {};
        let nodes = document.getElementsByTagName("body");
        if ( nodes.length > 0 )
        {
            let attributes = nodes[0].attributes;

            let length = attributes.length;
            for (let i = 0; i < length; i++)
            {
                let att = attributes[i];
                _params[att.name] = att.value;
            }
        }

        return _params[key];
    }

    export function openURL( url:string ):void
    {
        if( CONF.isNative )
        {
            // openWebView 参数
            // {
            // "url":"",
            // "showbar":false,		//显示标题栏
            // "title":"",			//标题
            // "orientation":默认和游戏一样,	// portait 竖屏  landscape 横屏  sensorlandscape 横屏，激活传感器  sensor 按传感器方向
            // "usesdk":false		//使用SDK
            // }
            (window as any).nativeInterface.openWebView( JSON.stringify( {url:url} ) );
        }
        else
        {
            window.open( url );
        }
    }

    export function changeWebURL( url:string ):void
    {
        if (!window.location) return;

        window.location.assign( url );
    }

    export function getUserAgent():string
    {
        if( egret.Capabilities.runtimeType == egret.RuntimeType.WEB )
        {
            return navigator ? navigator.userAgent : "";
        }
        return "";
    }

    export function loadScript( src:string, cb?:Function ):void {
        let s = document.createElement('script');
        s.async = false;
        s.src = src;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', <any>arguments.callee, false);

            if(cb) cb( src );
        }, false);

        document.body.appendChild(s);
    }

    export function getGlobal( name:string ):any {
        return window[name];
    }

    export function setGlobal( name:string, val:any ):any {
        window[name] = val;
    }

    export function hideLoad(){
            let e = document.getElementById("loadingDiv");
            e && e.parentNode.removeChild(e)
    }

    export function copyText(value:string){
        let input = document.createElement("input");
        input.value = value;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
        document.execCommand('Copy');
        document.body.removeChild(input);
    }

    export function isHttps(){
        if (!window.location) return false;

        return window.location.protocol == "https:";
    }
}
