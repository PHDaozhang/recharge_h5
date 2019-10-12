class LoadingUI extends egret.Sprite
{
    private textField:egret.TextField;

    constructor()
    {
        super();
        this.createdView();
    }
    public createdView():void{
        let self = this;
        let textCtrl = new egret.TextField();
        self.textField =  textCtrl ;
        self.addChild( textCtrl );
        textCtrl.y = 300;
        textCtrl.width = 1280;
        textCtrl.height = 100;
        textCtrl.textAlign = "center";
    }
    public setProgress(current, total):void
    {
        //this.textField.text = "Loading..." + current + "/" + total;
    }
}