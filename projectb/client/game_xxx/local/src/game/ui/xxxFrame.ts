module GMD_xxx{

    export class XxxFrame extends game.UIFWBase{
        public skBack:cui.ScaleButton;
        public skTest:cui.Label;
        public skUI:XxxUI;
		public skNotify:cui.Group;
		public skMenuGrp:cui.MenuGroup;

        private _test:boolean;
        constructor(){
            super();
            let self = this;
            self.skinName = "XxxSkin";
            self._test = false;
        }

        /**
         * 控件创建完成后 第一次显示时 调整  只调用一次
         */
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skBack.setTarget(function(){
                self.close();
            },self);

            self.updateHead();
			new game.HomeView().setNotifyParent(self.skNotify);
			self.skMenuGrp.selectTag = 0;//默认选择第几个页签
			//param tar:组件，pent:百分比，isOut:移出移进，isHorizontal:水平还是竖直
			//let ani = new game.MoveXFWAni(self.skGrp,5,out,false);
			//fin:回调
            //self.startAni(ani,self.updateGrp,self);
			// 还可以设置缩放scaleX:0.3, scaleY:0.3
			let actionSeq = new TRain.ActionSequence();
            actionSeq.addAction(new TRain.ActionPropTo(100,1,{x:600,y:11}));

            let action1 = new TRain.ActionCallDo();
            action1.setCall( function(){TRain.actionMgr.rmvAction(actionSeq)}, self);
            actionSeq.addAction( action1 );
            TRain.actionMgr.addAction(actionSeq, self.skTest, false);
        }

        /**
         * 显示时调用  0~n次 
         *  */
        protected onShow( stage:egret.Stage ){
            super.onShow( stage );
            
			let self = this;
            TRain.core.addFrameDo(self.randomTxt, self, true, 5000);

            self.updateHead();
            gameDataMo.addPropListener( "icon_custom", self.updateHead, self );
		}

        /**
         *  隐藏时调用  0~n次 
         * */
		protected onHide(){
            super.onHide();

			let self = this;
            TRain.core.rmvFrameDo(self, self.randomTxt);
            
            gameDataMo.rmvPropListener( "icon_custom", self );
        }
        
        private randomTxt():void{
			let self = this;
			let num = Math.ceil(Math.random() * 4);
			self.skTest.text = String(num);
        }
        
        private updateHead():void{
            //let self = this;
            //let accData = gameDataMo.getData();

			//获取当前头像
            //self.skTest.text = game.DataFormat.getHeadIcon(accData.icon_custom);
		}
    }
}