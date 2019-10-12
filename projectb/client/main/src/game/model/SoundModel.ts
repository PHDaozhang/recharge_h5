module game{
    export class SoundModel{
        // public playSound(id:number):void{
        //     let self = this;
        //     let soundMgr = TRain.soundMgr;
        //     let soundConf = dataMgr.gameMo.getSoundConf(id);
        //     if(id == 8 || id == 9){//播放背景音乐
        //         soundMgr.playMusic(soundConf.name);
        //     }else{
        //         soundMgr.playSFX(soundConf.name);
        //     }
        // }
        public setState(val:boolean):void{
            let soundMgr = TRain.soundMgr;
            GameUtil.setLocal( GameUtil.LocalKey.SFX_STATUS, val );
            soundMgr.sfxState = val;
            GameUtil.setLocal( GameUtil.LocalKey.MUSIC_STATUS, val );
            soundMgr.musicState = val;
        }
        public getState():boolean{
            let soundMgr = TRain.soundMgr;
            return soundMgr.musicState || soundMgr.sfxState;
        }
    }
}