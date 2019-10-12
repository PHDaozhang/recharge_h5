module.exports = {
//初始化皮肤
initSkins:[],
  
//新增加的属性
propTypeList:{number:["tag","anthorPerX","anthorPerY","maskX","maskY","imgX","imgY","imgScaleX","imgScaleY",
							"paddingBottom","paddingTop","paddingRight","paddingLeft","anitp","gap","width","height","x","y",
							"maxChars","textColor","tableSize","size","promptColor","fontSize","throwSpeed","vCenter",
							"hCenter","left","right","top","bottom","alpha","stroke","strokeColor","perHeight","perWidth",
							"lineSpacing","value","letterSpacing","maximum","itemW","itemH",
							"horizontalGap","verticalGap"],
					string:["restrict","source","mSource","cSource","stateStr","currState","scrollPolicyV","scrollPolicyH","sound","skName","aniName","skinName",
							"textAlign","fontFamily","prompt","fileName","text","verticalAlign","icon","label","font","effectId",
							"title","direction","horizontalAlign","txtKey","txtFlowKey","filterNm","dbNm","itemSkinName"],
					boolean:["touchEnabled","touchThrough","keepSelect","activeCheckEnable","activeInView","canOutBound","autoPlay","enableAniCache","isHorizontal","bold","bounces","visible","repeatClk","showItemInfoOnClick","hideLabelText","multiline","selected","performanceControl","enabled","italic","trigTm"],
					any:["viewport","layout","itemRenderer"],
					Array:["elementsContent"],
					Rectangle:["scale9Grid","mask"]},
					
//新增加的UI组件 对应eui组件表  默认为Component
ctrl2eui:{Image:"Image", MaskImage:"Component", MenuGroup:"Group", Component:"Component",Group:"Group", TableScroller:"Group",
				TableView:"Group", ScrollView:"Group",SimpleButton:"Component", StateImage:"Image",BitmapLabel:"BitmapLabel",DataGroup:"DataGroup",
				ProgressBar:"ProgressBar", Scroller:"Scroller", MenuItem:"Component", MenuItemImage:"Component",Button:"Component",
				ButtonSound:"Component",MenuItemImageSound:"Component",MenuItemSound:"Component",UIAnimate:"Group",UIMovieClip:"Group",
				DataLineLayout:"BasicLayout",
				ActivityItem:"ItemRenderer",
				UIEffect:"Image",
				Skin:"Skin"},
				
							
//用于剔除控件默认属性						
defaultValList:{x:0,y:0,width:0,height:0,anchorOffsetX:0,anchorOffsetY:0},


};