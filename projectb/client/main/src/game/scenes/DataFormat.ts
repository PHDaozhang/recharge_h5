module game.DataFormat{
    export function formatGold(gold:number,isLang?:boolean,fixed?:number):string{
        let self = this;
        let value = convertGold(gold);
        let goldStr:string = "";
        let wGold = value / 10000;
        if(value > 10000){
            let bGold = wGold / 10000;
            if(bGold > 10000){
                goldStr = bGold.toFixed(fixed||2) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.hundredMillionRmb) :moneyTp.by) ;
            }else{
                goldStr = wGold.toFixed(fixed||2) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.tenThousandRmb) :moneyTp.wy) ;
            }
        }else{
                goldStr = value.toFixed(fixed||2) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.RMBText):moneyTp.y) ;
        }
        return goldStr;
    }

    /**
     * 获取角色头像资源
     * @param icon_custom 
     */
    export function getHeadIcon(icon_custom:string):string{
        let idx1 = icon_custom.indexOf(".");
        let idx = icon_custom.indexOf("head_");
        if(idx>=0 && idx1>=0){
            icon_custom = icon_custom.substring( 5, idx1 );
        }
        return HeadImg.head + icon_custom;
    }
   //原始格式
    export function convertGold(value:number):number
    {
        if(value == null || isNaN(value))
        {
            return 0;
        }

        return value / confConsts.ConstTp.MoneyBase;
    }

    //万亿格式,带小数
    export function convertGoldString2(gold:number,isLang?:boolean):string
    {
        let value = convertGold(gold);
        if(value >= 100000000)
        {
            return (Math.floor(value / 1000000) / 100).toFixed(2) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.hundredMillion) :moneyTp.b);
        }
        else if(value >= 10000)
        {
            return (Math.floor(value / 100) / 100).toFixed(2) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.tenThousand) :moneyTp.w);
        }else if(value >= 1000){

            return (Math.floor(value / 100) / 10).toFixed(2) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.tenThousand) :moneyTp.q);//千
        }
        else
        {
            return value.toFixed(2);
        }
    }

    //有小数显示小数，没小数不显示
    export function convertGoldString3(gold:number):string
    {
        let value = convertGold(gold);
        let intValue= Math.floor(value);
        if(intValue == value)
        {
            return intValue.toString();
        }
        else
        {
            return value.toFixed(2);
        }
    }
    //格式化金币，不带小数点后两位
    export function convertGoldString4(gold:number,isLang?:boolean):string
    {
        let value = convertGold(gold);
        if(value >= 100000000)
        {
            return (Math.floor(value / 1000000) / 100) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.hundredMillion) :moneyTp.b);
        }
        else if(value >= 10000)
        {
            return (Math.floor(value / 100) / 100)+ (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.tenThousand) :moneyTp.w);
        }else if(value >= 1000){
            
            return (Math.floor(value / 100) / 10) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.tenThousand) :moneyTp.q);//千
        }
        else
        {
            return String(value);
        }
    }
    export function convertYuanString(value:number,isLang?:boolean):string
    {
        return convertGold(value)+ (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.RMBText) :moneyTp.y);
    }

    //万亿格式,带小数
    export function convertYuanString2(gold:number,isLang?:boolean):string
    {
        let value = convertGold(gold); 
        if (value >= 100000000)
        {
            return (Math.floor(value / 1000000) / 100) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.hundredMillionRmb) :moneyTp.by);
        }
        else if (value >= 10000)
        {
            return (Math.floor(value/100)/100) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.tenThousandRmb) :moneyTp.wy);
        }else
        {
            return value + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.RMBText) :moneyTp.y);
        }
    }

    //有小数显示小数，没小数不显示
    export function convertYuanString3(gold:number,isLang?:boolean):string
    {
        let value = convertGold(gold);
        let intValue = Math.floor(value);
        if(intValue == value)
        {
            return intValue + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.RMBText) :moneyTp.y);
        }
        else
        {
            return value.toFixed(2) + (isLang ? TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.RMBText) :moneyTp.y);
        }
    }
    //格式化名字显示
    //maxLen 策划要求的字符数量的最大值
    //halfLen  策划要显示的半角数
    export function formatName(name:string,maxLen?:number,halfLen?:number):string{
        let str = CheckStringLength(name);
        let len = str[0];
        let chaLen = str[1];
        if(len > (maxLen || 10)){
            let firstIdx:number ;
            let tmpHalfLen = (halfLen || 6);
            let halfIdx = (tmpHalfLen/2) ;
            if(chaLen >= halfIdx){
                firstIdx = halfIdx;
            }else{
                firstIdx = tmpHalfLen - chaLen;
            }
            let replaceStr = name.substring(firstIdx);
            return name.replace(replaceStr,"...");
        }else{
            return name;
        }
    }
    //返回半角字符长度和有几个全角
    export function CheckStringLength (txt:string) : number[]
    {
        let len:number = 0;
        let chaLen:number = 0;
        for (let i = 0; i < txt.length; i ++)
        {
            if (txt.charCodeAt (i) >= 0x4e00 && txt.charCodeAt (i) <= 0x9fa5){//汉字的unicode范围是：0x4E00~0x9FA5
                len += 2;
                chaLen ++;
            }else{
                len += 1;
            }
        }
        return [len,chaLen];
    }
}