module TimeUtil {

    export const enum TimeConst {
        MONTHS_PER_YEAR = 12,
        DAYS_PER_WEEK = 7,
        HOURS_PER_DAY = 24,
        MINUTES_PER_HOUR = 60,
        SECONDS_PER_MINUTE = 60,
        SECONDS_PER_HOUR = 3600,
        SECONDS_PER_DAY = 86400,
        WEEKDAY_AT_FIRST_DAY = 4,
        MILLIS_PER_SECOND = 1000,
        MILLIS_PER_MINUTE = 60000,
        MILLIS_PER_HOUR = 3600000,
        MILLIS_PER_DAY = 86400000,
        SERVER_OPEN_DAY = 259200,//开服后三天状态变为火爆
        DAYS_ONE = 1,//开服首日
    }

    //-------------------------------------------------------------------
    let _svrBegin:number;//开服当天，0点， 单位毫秒
    let _localTm:number;
    let _svrTm:number;
    export function setBeginTm( beginTm_s:number ):void{
        _svrBegin = getTodayTm( beginTm_s*1000 );
    }

    export function isFirstDay():boolean{
        let severTm = getSvrMS();
        return TimeUtil.getTodayTm( severTm ) == _svrBegin;
    }

    export function setSvrTm(svrTm:number):void
    {
        _localTm = Date.now();
        _svrTm = svrTm*1000;
    }
    /**
     * 获取当前服务器的时间戳，单位毫秒
     *
     * */
    export function getSvrMS():number
    {
        return _svrTm + Math.floor((Date.now()-_localTm));
    }

    export function getSvrSec():number
    {
        return Math.floor(getSvrMS() / 1000);
    }

    //--------------------------------------------------------------
    /**
     *	@brief	获取相对当天具体时间点的时间
        *
        *	@param 	svrTm 服务器时间  单位毫秒
        *	@param 	offHour 	相当于0点的 移动值  时间点 单位小时
        *
        *	@return 时间戳 单位秒
        */
    export function getRefreshTm(svrTm: number, refreshHour: number = 0): number {
        let nowDate = new Date(svrTm);
        let nowHour = nowDate.getHours();
        nowDate.setHours(0, 0, 0, 0);
        let retTm = Math.floor(nowDate.getTime() / 1000) + refreshHour * 3600;
        if (nowHour < refreshHour) {
            retTm -= 86400;
        }
        return retTm;
    }

    /**
     *	@brief	获取参数now当天的几点几分的time_t
        *
        *	@param 	time 要获取的当前时间 单位毫秒
        *	@param 	h 	时
        *	@param 	m 	分
        *	@param 	s 	秒
        *
        *	@return 时间戳 单位毫秒
        */
    export function getTodayTm(msTm: number, h: number = 0, m: number = 0, s: number = 0, ms: number = 0): number {
        let date = new Date(msTm);
        date.setHours(h, m, s, ms);
        return date.getTime();
    }
    //明天0点
    export function getTowTm(now: number, h: number = 0, m: number = 0, s: number = 0): number {
        return TimeUtil.getTodayTm(now, h, m, s) + TimeConst.MILLIS_PER_DAY;
    }

    //到明天还有多久
    export function getTowDiff(now: number, h: number = 0, m: number = 0, s: number = 0): number {
        return TimeUtil.getTowTm(now, h, m, s) - now;
    }

    /**
     * 判断是否为同一天
     * */
    export function equalsDay(secTm1: number, secTm2: number): boolean {
        let tm1 = new Date(secTm1);
        let tm2 = new Date(secTm2);
        return tm1.getFullYear() == tm2.getFullYear() && tm1.getMonth() == tm2.getMonth() && tm1.getDate() == tm2.getDate();
    }
    /**
     * 本期结束还有几天几时几分几秒 周一 和周五零点结束
     */
    export function formatTm():any{
        let svrTm = getSvrMS();
        let tm = new Date(svrTm );
        //获取今天0点的时间戳
        let todayZeroTm = getRefreshTm(svrTm) * 1000; 
        //获取今天周几
        let weekDay = tm.getDay() ;
        if(weekDay == 0) weekDay = 7;
        let finTm:number  = 0; //单位毫秒
        if(weekDay > 0 && weekDay < 5){//计算距离周五零点还有多久
            finTm =  todayZeroTm + TimeConst.MILLIS_PER_DAY * (5-weekDay);
        }else{ //计算距离周一零点还有多久
            finTm =  todayZeroTm + TimeConst.MILLIS_PER_DAY * (8-weekDay);
        }
        //获取现在时间到结束时间的差值 
        let offTm = finTm - svrTm;
        return getHourMinSec(offTm);
    }
    /**
     * 
     * @param tm 毫秒
     */
    export function getHourMinSec(offTm:number):any{
        let date:any = {};
        let day:number = 0;
        let hour:number= 0;
        let min:number = 0;
        let sec:number = 0;
        day = offTm >= TimeConst.MILLIS_PER_DAY ? Math.floor(offTm / TimeConst.MILLIS_PER_DAY): 0;
        date.day = day;
        offTm -=  day * TimeConst.MILLIS_PER_DAY;
        hour = offTm >= TimeConst.MILLIS_PER_HOUR ? Math.floor(offTm / TimeConst.MILLIS_PER_HOUR): 0;
        date.hour = hour;
        offTm -=  hour * TimeConst.MILLIS_PER_HOUR;
        min = offTm >= TimeConst.MILLIS_PER_MINUTE ? Math.floor(offTm / TimeConst.MILLIS_PER_MINUTE): 0;
        date.min = min;
        offTm -=  min * TimeConst.MILLIS_PER_MINUTE;
        sec = offTm >= TimeConst.MILLIS_PER_SECOND ? Math.floor(offTm / TimeConst.MILLIS_PER_SECOND): 0;
        date.sec = sec;
        offTm -=  sec * TimeConst.MILLIS_PER_SECOND;
        return date;
    }
}
