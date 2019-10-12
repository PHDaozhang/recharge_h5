module game
{
    export class ParticleAni{
        private _p:egret.DisplayObjectContainer;
        private _sys: cui.ParticleSys;

        constructor(parent: egret.DisplayObjectContainer, particleNm:string) {
            let self = this;
            self._p = parent;
            let sys = self._sys = UIUtils.createParticle( particleNm );
            sys.addEventListener( cui.UI_EVENT.EVT_PLAY_FIN, self.onFin, self );
        }

        public start() {
            let self = this;
            let sys = self._sys;
            if( !sys.parent ){
                self._p.addChild( sys );
            }
            sys.start();
        }

        public stop(){
            let self = this;
            let sys = self._sys;
            sys.stop( true );
            self.onFin();
        }

        public dispose(){
            let self = this;
            self.onFin();
            self._sys.dispose();
        }

        private onFin() {
            let sys = this._sys;
            let p = sys.parent;
            if( p ) p.removeChild( sys );
        }
    }
}