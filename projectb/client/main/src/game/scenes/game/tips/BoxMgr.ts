module game
{
    export module BoxMgr {
        let _parent:cui.Group;//父窗口
        let _delegate:LayerDelegate;

        let _boxGp:BoxUI;

        export function setParent(parent:cui.Group, layerDelegate:LayerDelegate):void{
            if( _parent && _boxGp ){
                _parent.removeChild( _boxGp );
            }

            _parent = parent;
            _delegate = layerDelegate;

            if( parent && _boxGp ){
                parent.addChild( _boxGp );
            }
        }

        function close():void{
            if( _parent.parent )
            {
                _delegate.hideLayer( _parent );
            }
        }

        function show(){
            if( !_parent.parent )
            {
                _delegate.showLayer( _parent );
            }
        }


        //--------------------------------- prompt -------------------------------------
        export function showBox( txt:string, cb?:(tag:number)=>void, tar?:any ):void{
            if( !_parent ) return;

            if( !_boxGp ) {
                _boxGp = new BoxUI();
                _parent.addChild( _boxGp );
            }

            _boxGp.setData( txt, function(tag:number){
                close();
                if( cb != null  ) cb.call( tar, tag );
            }, BoxMgr );

            show();
        }
    }
}