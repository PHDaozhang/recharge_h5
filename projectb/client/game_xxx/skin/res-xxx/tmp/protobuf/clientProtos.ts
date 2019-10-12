module NET_CONF{
	export const enum C2S_ROUTE_TP {
		c2s_get_scene_info = 10002,
	}
	export const enum S2C_ROUTE_TP {
		s2c_check_state_result = 15001,
	}
	export type c2s_get_scene_info = {
		packet_id?:number;//uint32   default=10002
	}

	export type s2c_check_state_result = {
		packet_id?:number;//uint32   default=15001
		result?:number;//int32
	}


	export let c2sEncode={"10002":{"packet_id":[1,0,1,0,10002]}};
	export let s2cDecode={"15001":{"1":["packet_id",0,1,0,15001],"2":["result",1,1,0]}};
	export let typeDecode={};
}