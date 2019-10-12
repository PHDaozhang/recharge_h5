module CONF {
    export let inner = 1;
    //export let svrUrl = "http://10.0.0.116:8611"; 
    //export let svrUrl = "http://192.168.1.49:8611";
    // export let svrUrl = "https://www.zhuangroume.com:1002/"
    export let svrUrl = "http://3.113.107.12:1001"
    //export let svrUrl = "http://10.0.0.211:8611";
     //export let svrUrl = "https://www.qilinziguan.net" 
    // export let svrUrl = "https://www.tiantianypt.com"

    export let kefuUrl = "https://www.mmhtml.com/";
    export let erweima = "https://www.best-xiaoxiao.xyz/";
    export let isNative = false;
    export let channelId = "657054_1"; // 440001  657054_1 
    export let agentId = "3"; // 1  3
    export let shareId = "657054_1"; //分享id // 440001 657054_1
    export let deviceId = ""; //设备号
    export let res:{[key:string]:string} = {};


    export const enum apkRes{
        login = "login",
    }
};