module game {

    // export const enum NotifyMo_EVT{
    //     got_notify = "new"
    // }

    export class NotifyModel extends Notification{
        private _notifys:NET_CONF.s2c_w2c_notify[]; //广播
        constructor(){
            super();

            let self = this;
            self._notifys = [];
            //notifiCenter.addListener( AccountMo_EVT.w2c_notify,self.onNotify, self );
        }
        
        private onNotify( data:NET_CONF.s2c_w2c_notify ){
            let self = this;
            self._notifys.push( data );
            self.postEvent( NotifyMo_EVT.got_notify );
        }

        public popNotify():NET_CONF.s2c_w2c_notify{
            return this._notifys.shift();
        }
    }
}