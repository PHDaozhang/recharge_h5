module game{

	export interface ParticlePropConf {
		key:string;  //属性名字
		bb:number;  //初始起始值  默认为0
		br:number;  //初始变化值  默认为0
		rb:number;  //变化变化值  默认为0
		rr:number;  //变化起始值  默认为0
		eb:number;  //结束起始值  默认为0  有rb或rr时 无效
		er:number;  //结束变化值  默认为0  有rb或rr时 无效
		ease:string;  //插值函数名
	}

	export interface ParticleColorConf {
		key:string;  //属性名字
		bb:number;  //初始起始值  默认为0
		br:number;  //初始变化值  默认为0
		rb:number;  //变化变化值  默认为0
		rr:number;  //变化起始值  默认为0
		eb:number;  //结束起始值  默认为0  有rb或rr时 无效
		er:number;  //结束变化值  默认为0  有rb或rr时 无效
		ease:string;  //插值函数名
	}

	export interface ActivityAwardConf {
		id:number;  //奖励ID
		vip:number[];  //vip开启范围  无则无限制
		tarVal:number;  //目标值(分)
		awd:number;  //奖励(分)
		cnt:number;  //可领取次数
		gold:number;  //需要花费的金币数量
		rank:number;  //奖励排名
		sRank:number;  //获得奖励起始排名（大于等于）
		eRank:number;  //获得奖励结束排名（小于等于）
		desc:string;  //备注
	}

	export interface ActivityRuleConf {
		id:number;  //规则id
		text:string;  //描述
		isImg:number;  //是否是图片
		x:number;  //坐标x
		y:number;  //坐标y
	}

	export interface GmdConf {
		id:number;  //游戏类型
		nm:string;  //游戏名字
		file:string;  //游戏名字母简称
		wg:number;  //子游戏权重
		class:number;  //游戏分类
		isOpen:number;  //是否开放
	}

	export interface QuestConf {
		id:number;  //任务ID
		name:string;  //名字
		desc:string;  //描述
		gameID:number[];  //游戏ID
		default:number;  //初始化
		weight:number;  //权重
		Style:number;  //细致分类（是否是金币类型）
		class:number;  //分类
		type:number;  //类型
		completeType:number;  //完成条件类型
		completeCount:number;  //完成计数
		completeParam:number;  //特殊参数
		nextQuestID:number;  //后续任务id
		isSaveCount:number;  //是否保留计数
		awardItemID:number;  //奖励物品ID
		awardItemCount:number;  //奖励物品数量
		isSet:number;  //计数是否设置（或者累加）
		goTo:number;  //是否有前往
		group:number;  //分组
		template:number;  //模板
		index:number;  //七日任务索引
		icon1:string;  //任务icon
	}

	export interface PluginsConf {
		id:number;  //游戏类型
		nm:string;  //游戏名字
		file:string;  //游戏名字母简称
		ver0:string;  //游戏皮肤版本号
		ver1:string;  //游戏脚本版本号
	}

	export interface ParticleConf {
		id:string;  //粒子特效名字
		einte:number;  //发射间隔 毫秒  默认为 100
		emax:number;  //最大总发射数量  默认为 100     -1标示没有限制
		dur:number;  //发射时间 毫秒
		oneMin:number;  //单次发射最少粒子数量   默认0 
		oneMax:number;  //单次发射最多粒子数量  默认0
		src:string;  //使用资源名字
		blendMode :number;  //混合模式 默认为0  0:normal  1:add  2:erase
		pcls:string;  //粒子类名 可选  有global、gravity、 mov
		anchor:{x:number,y:number};  //  x:使用资源锚点  y:使用资源锚点
		prop:{[key:string]:ParticlePropConf};
		color:{[key:string]:ParticleColorConf};
	}

	export interface VIPProfitConf {
		VipLv:number;  //vip等级
		VipExp:number;  //升级所需经验
		OnlineReward:number;  //领取在线奖励次数
		MaxGiftslimit:number;  //每日送礼上限
		GiveTicket:number;  //每天赠送礼券
		DailyLottery:number;  //每日抽奖次数上限
	}

	export interface PerformConf {
		Level:number;  //推广员等级
		PButton:number;  //收益下限
		PTop:number;  //收益上限
		Rate:number;  //返利（万分率）
		Describe:string;  //等级描述
	}

	export interface ExtendConf {
		id:number;  //规则id
		text:string;  //描述
		isImg:number;  //是否是图片
		x:number;  //坐标x
		y:number;  //坐标y
	}

	export interface OpenConf {
		id:number;  //功能id
		isOpen:number;  //是否开放
	}

	export interface ActivityConf {
		id:number;  //活动id
		sid:number;  //活动展示id
		name:string;  //名称
		show:number;  //是否显示活动
		new:number;  //是否显示新
		boom:number;  //是否显示火爆
		type:number;  //活动类型(0限时1活动)
		title:string;  //标题图片
		award:{[key:string]:ActivityAwardConf};
		rule:{[key:string]:ActivityRuleConf};
	}

	export interface ActShowConf {
		id:number;  //活动展示id
		icon:string;  //活动入口icon
		link:string;  //活动入口
		name:string;  //名称
		profile:string;  //简介
		desc:string;  //详情
		tag:number;  //标签
		sort:number;  //排序
		viewTp:number;  //界面类型
		font:number[];  //金额字体
		bg:number[];  //底图
		actN:string;  //文字图
		aniN:number[];  //动画名称
	}

	export interface TipControlConf {
		txt:string;  //提示文字
		os:number;  //   注：不填则表示 无平台需求
	}

	export interface HallFunPopConf {
		ID:number;  //窗口序号
		WindowName:any;  //窗口名字
		Sort:number;  //显示先后顺序（数字越大后显示）
		Probability:number;  //弹出概率(百分比)
		IsShow:number;  //是否开启
	}
}