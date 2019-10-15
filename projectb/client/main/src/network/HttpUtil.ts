    
module game{

    export module HttpUtil
    {
        export interface ILoadShow
        {
            showBusy();
            hideBusy();
        }

        export let busyUI:ILoadShow;
        export let svrURL:string = "";

        export function accLogin( args:{nm:string,channel:string,agentId:string,hardwareId:string}, showBusy:boolean, cb:Function, target:any ){//游客登录
            if(CONF.isNative){
                let postData = args.nm + ':' + args.channel + ':' + args.agentId + ':' + args.hardwareId;
                reqURL( "/Web/WebLogin.aspx", makeSign(postData), showBusy, cb, target );
            }else{ //网页端
                let postData = args.nm + ':' + args.channel + ':' + args.agentId ;
                reqURL( "/Web/WebLogin2.aspx", makeSign(postData), showBusy, cb, target );
            }
        }

        export function serverList( args:{nm:string}, showBusy:boolean, cb:Function, target:any ){
            let postData = makeSign( args.nm );
            reqURL( "/Web/ServerList.aspx", postData, showBusy, cb, target );
        }

        export function checkCode( args:{phone:string,agentId:string}, showBusy:boolean, cb:Function, target:any ){
            let postData = args.phone + ':' + args.agentId;
            reqURL( "/Web/WebCode.aspx",makeSign( postData ) , showBusy, cb, target );
        }
        export function regAcc( args:{phone:string, pwd:string, checkcode:string,channel:string,agentId:string,hardwareId:string}, showBusy:boolean, cb:Function, target:any){
            let signedPsw = md5(args.pwd + "NANA1314");
            let data = args.phone + ':' + args.checkcode + ':' + signedPsw + ':' + args.channel + ':' + args.agentId + ':' + args.hardwareId;;
            reqURL( "/Web/WebRegAccount.aspx", makeSign( data ), showBusy, cb, target );
        }
        export function loginAcc( args:{phone:string, pwd:string ,channel:string,agentId:string ,hardwareId:string}, showBusy:boolean, cb:Function, target:any){//账号密码登录
            let signedPsw = md5(args.pwd + "NANA1314");
            let data = args.phone + ':' + signedPsw + ':' + args.channel + ':' + args.agentId + ':' + args.hardwareId;;
            reqURL( "/Web/WebPhoneLogin.aspx", makeSign( data ) , showBusy, cb, target );
        }
        export function bindAcc( args:{phone:string, pwd:string, nm:string, checkcode:string ,agentId:string ,hardwareId:string}, showBusy:boolean, cb:Function, target:any){
            let signedPsw = md5(args.pwd + "NANA1314");
            let data = args.nm + ':' + args.phone + ':' + args.checkcode + ':' + signedPsw + ':' + args.agentId + ':' + args.hardwareId;;
            reqURL( "/Web/WebBindAccount.aspx", makeSign( data ), showBusy, cb, target );
        }
        export function CheckNotice(args:{agentId:string},showBusy:boolean,cb:Function,target:any){
            let data = "agentId=" + args.agentId;
            reqURL( "/Server/CheckNotice.aspx", data  , showBusy, cb, target );
        }
        export function getIp( showBusy:boolean, cb:Function, target:any ){
            reqURL( "/Common/GetP.aspx", "", showBusy, cb, target );
        }

        export function gotoKeFu(){
			let uid = "";
			let uname = "游客";
			let token = "";
			//let avatar = StringUtil.printf(tempUrl, "static/img/female.a384e7e.jpg");
            let avatar = CONF.kefuUrl + "static/img/female.a384e7e.jpg";
			let agentId = 165;
			let data = dataMgr.accMo.getData();
			if(data != null){
				uid = data.aid.toString();
				uname = data.nickname;
				token = data.cs_token;
			}
			//let tempSign = StringUtil.printf(uid, agentId, deviceID, encodeURI(uname), encodeURI(avatar), "3C3831AD16D3A32AD8E26CEB505DB57D");
            let urlCode1 = encodeURI(uname);
            let urlCode2 = encodeURI(avatar);
            let tempSign = uid + agentId + CONF.deviceId + urlCode1 + urlCode2 + "3C3831AD16D3A32AD8E26CEB505DB57D";
			let sign = md5(tempSign);
			let url = CONF.kefuUrl +
			 "?uid=" + uid + 
			 "&uname=" + urlCode1 +
			 "&agentid=" + agentId +
			 "&avatar=" + urlCode2 +
			 "&sign=" + sign + 
			 "&mac=" + CONF.deviceId + 
			 "&token=" + token;
             URLUtil.openURL( url );
        }

        export function askCreateImg(args: { playerid: string, link: string }, showBusy: boolean, cb: Function, target: any) {
            let data = Base64.base64Encode(args.link);
            let postData = makeSign(data);
            reqURL("/QrCode/WebCreateQr.aspx", postData, showBusy, cb, target);
        }

        function makeSign( data:any ){
            var sign = md5(data + "8DB1C7CE26C2A748FA3627410DB0FB0F");
            return "data=" + data + "&sign=" + sign;
        }

        export function reqURL(url:string, data:string, showBusy:boolean, cb:Function, target:any):void {
            let request = new egret.HttpRequest();
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(svrURL + url, egret.HttpMethod.POST);
            request.addEventListener(egret.Event.COMPLETE, function (e:egret.Event) {
                if(showBusy && busyUI ) busyUI.hideBusy();
                let req = <egret.HttpRequest>e.currentTarget;
                let data = JSON.parse(req.response);
                cb.call(target, data);
            }, this);

            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
                if(showBusy && busyUI ) busyUI.hideBusy();
                cb.call(target);
            }, this);

            if(showBusy && busyUI ) busyUI.showBusy();

            request.send( data );
        }
    }
}

