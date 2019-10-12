// module game{
//     export class RouteList extends cui.Component{
//         public skList:cui.DataGroup;
//         public skImg:cui.Image;
//         public itemSkinName:string;

//         private _imgLen:number;
//         private _itemPro:cui.ArrayCollection;
//         constructor(){
//             super();
//         }

//         public childrenCreated():void{
//             let self = this;
//             let list = self.skList;
//             list.itemRender = RouteStateTile;
//             list.itemSkinName = self.itemSkinName;
//             list.dataProvider = self._itemPro = new cui.ArrayCollection();
//             self._imgLen = self.skList.width / self.skImg.width;
//         }
//         /**
//          * 
//          * @param data {格式化后的数据，item的皮肤名}
//          */
//         public setData(routeList:any[]){
//             let self = this;
//             let showTile = [];
//             for(let i = 0 ;i < routeList.length;i++){
//                 showTile.push(routeList[i]);
//             }
//             self._itemPro.source = showTile;
//             let tmpLen = routeList.length / colTp.six ;
//             if(tmpLen <= self._imgLen){
//                 self.skImg.width = self.skList.width;
//             }else{
//                 self.skImg.width = self.skImg.width * Math.ceil(tmpLen);
//             }
//         }
//     }

// }
