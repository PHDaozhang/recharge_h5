
module StringUtil
{

    /**
     * 字符串补全。
     * @param src
     * @param fillStr
     * @param isPre
     * @returns {*}
     */
    export function fill(src:any, fillStr:string, isPre?:boolean):string
    {
        if (isPre === void 0) { isPre = true; }
        src = src + "";
        let sl = src.length, fl = fillStr.length;
        if (sl >= fl)
            return src;
        if (isPre) {
            return fillStr.substring(0, fl - sl) + src;
        }
        else {
            return src + fillStr.substring(sl);
        }
    }

    /**
     * 格式化字符串
     * */
    export function format( str:string, ...rest ):string
    {
        let num:number = arguments.length;
        for (let i = 1; i < num; i++)
        {
            let pattern = "\\{" + (i-1) + "\\}";
            let re = new RegExp(pattern, "g");
            str = str.replace(re, arguments[i]);
        }
        return str;
    }

    /**
     * 替换字符串，将字符串中%s\%d\%f等 使用后续的参数进行替换
     * @param str 要替换的字符串
     * @param ...rest 后续要进行替换的参数
     * @returns 替换结果后的字符串
     **/
    let _regexp:RegExp = new RegExp( "(%([%]|(\\-)?(\\+| )?(0)?(\\d+)?(\\.(\\d)?)?([bcdfosxX])))", "g" );
    export function printf( str:string, ...rest ):string
    {
        if( !str ) return "";

        let matches = new Array<Object>();
        let strings = new Array<string>();

        let convCount = 0;
        let stringPosStart = 0;
        let stringPosEnd = 0;
        let matchPosEnd = 0;
        let newString = '';
        let match:any;
        while (match = _regexp.exec(str)) {
            if (match[9]) {
                convCount += 1;
            }

            stringPosStart = matchPosEnd;
            stringPosEnd = _regexp.lastIndex - match[0].length;
            strings.push(str.substring(stringPosStart, stringPosEnd));
            matchPosEnd = _regexp.lastIndex;
            matches.push({
                match: match[0],
                left: match[3] ? true : false,
                sign: match[4] || '',
                pad: match[5] || ' ',
                min: match[6] || 0,
                precision: match[8],
                code: match[9] || '%',
                negative: parseInt(arguments[convCount]) < 0 ? true : false,
                argument: String(arguments[convCount])
            });
        }

        strings[strings.length] = str.substring(matchPosEnd);
        if (matches.length === 0) {
            return str;
        }

        if ((arguments.length - 1) < convCount) {
            return null;
        }

        let substitution:string;
        let i:number = 0
        for (; i < matches.length; i++)
        {
            match = matches[i];
            switch(match.code){
                case '%':
                    substitution = '%';
                    break;
                // case 'b':
                //     match.argument = String(Math.abs(parseInt(match.argument)).toString(2));
                //     substitution = convert(match, true);
                //     break;
                // case 'c':
                //     match.argument = String.fromCharCode( parseInt( String(Math.abs( parseInt(match.argument)) )));
                //     substitution = convert(match, true);
                //     break;
                case 'd':                
                    match.argument = String(Math.abs(parseInt(match.argument)));
                    substitution = convert(match);
                    break;
                // case 'f':               
                //     match.argument = String(Math.abs(parseFloat(match.argument)).toFixed(match.precision ? match.precision : 6));
                //     substitution = convert(match);
                //     break;
                // case 'o':
                //     match.argument = String(Math.abs(parseInt(match.argument)).toString(8));
                //     substitution = convert(match);
                //     break;
                case 's':
                    match.argument = match.argument.substring(0, match.precision ? match.precision : match.argument.length)
                    substitution = convert(match, true);
                    break;
                // case 'x':
                //     match.argument = String(Math.abs(parseInt(match.argument)).toString(16));
                //     substitution = convert(match);
                //     break;
                // case 'X':
                //     match.argument = String(Math.abs(parseInt(match.argument)).toString(16));
                //     substitution = convert(match).toUpperCase();
                //     break;
                default:
                    substitution = match.match;
            } 
            newString += strings[i];
            newString += substitution;
        }
        newString += strings[i];

        return newString;
    }

    function convert(match:any, nosign:boolean=false):string
    {
        if (nosign)
        {
            match.sign = '';
        }
        else
        {
            match.sign = match.negative ? '-' : match.sign;
        }

        let l:number = match.min - match.argument.length + 1 - match.sign.length;
        let pad:string = new Array(l < 0 ? 0 : l).join(match.pad);
        if (!match.left)
        {
            if (match.pad === "0" || nosign)
            {
                return match.sign + pad + match.argument;
            }
            else
            {
                return pad + match.sign + match.argument;
            }
        }
        else
        {
            if (match.pad === "0" || nosign)
            {
                return match.sign + match.argument + pad.replace(/0/g, ' ');
            }
            else
            {
                return match.sign + match.argument + pad;
            }
        }
    }
}
