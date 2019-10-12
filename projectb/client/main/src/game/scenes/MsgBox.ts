module game {
    export module MsgBox {
        //tag =0 表示取消  =1表示确定
        export function showBoxCB(gp: string, key: string | number, fun: (tag: number) => void, tar: any) {
            let txt = TRain.langMgr.getTxt(gp, key);
            BoxMgr.showBox(txt, fun, tar);
        }

        export function showBoxCB2(str: string, fun: (tag: number) => void, tar: any) {
            BoxMgr.showBox(str, fun, tar);
        }
        export function showPrintBoxCB(gpName: string, key: string | number, fun: (tag: number) => void, tar: any, ...rest) {
            let txt = TRain.langMgr.getTxt(gpName, key);
            rest.unshift(txt);
            txt = StringUtil.printf.apply(StringUtil, rest);
            BoxMgr.showBox(txt, fun, tar);
        }
        export function showBox(gp: string, key: string | number, other?: string) {
            let txt = TRain.langMgr.getTxt(gp, key);
            if (other) txt += other;
            BoxMgr.showBox(txt);
        }

        export function showErr(errCode: number | string) {
            let txt: string;
            if (typeof errCode == 'number') {
                txt = TRain.langMgr.getErrText(errCode);
            }
            else {
                txt = errCode;
            }

            TipsMgr.showPrompt(txt, UIColor.red);
        }

        export function showPrompt(errCode: number | string) {
            let txt: string;
            if (typeof errCode == 'number') {
                txt = TRain.langMgr.getErrText(errCode);
            }
            else {
                txt = errCode;
            }

            // let conf = dataMgr.generalMo.getPromptConf( errCode );
            // if( conf ){

            // }
            // else{
            //直接显示
            TipsMgr.showPrompt(txt, UIColor.red);
            // }
        }

        /**
         * 
         * @param gpName 
         * @param key 
         * @param color  默认白色
         */
        export function showTxt(gpName: string, key: string | number, size?: number, color?: UIColor) {
            let txt = TRain.langMgr.getTxt(gpName, key);
            TipsMgr.showPrompt(txt, color, 3000, false, size);
        }
        /**
         * 
         * @param gpName 
         * @param key 
         * @param repValue 要替换的
         * @param color  默认白色
         */
        export function showPrintfTxt(gpName: string, key: string | number, color?: UIColor, ...rest) {
            let txt = TRain.langMgr.getTxt(gpName, key);
            rest.unshift(txt);
            txt = StringUtil.printf.apply(StringUtil, rest);
            TipsMgr.showPrompt(txt, (color == undefined) ? UIColor.white : color);
        }
    }

    msgPrompt = MsgBox;
}