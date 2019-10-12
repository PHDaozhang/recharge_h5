module game
{
    export class LoadingScene extends BaseScene 
    {
        private static _inst:LoadingScene;
        public static getInst():LoadingScene
        {
            if(!LoadingScene._inst)
            {
                LoadingScene._inst = new LoadingScene();
            }
            return LoadingScene._inst;
        }

        private _view:LoadingView;
        constructor(){
            super();
            let self = this;
            let view = self._view = new LoadingView();
            self.addChild( view );
        }


        public dispose(){
            LoadingScene._inst = null;
            //TipsMgr.setParent( null, null );
            super.dispose();
        }

        public setLoadStep(msg:string, totalper:number, tm:number):void
        {
            this._view.setLoadStep(msg,totalper,tm);
        }

        public isFinish():boolean
        {
            return this._view.isFinish();
        }
    }
}