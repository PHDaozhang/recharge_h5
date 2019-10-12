/**
 *
 * @author 
 *
 */
module cui {
    export class MenuGroup extends eui.Group
    {
        public keepSelect: boolean = false;
        public activeCheckEnable: boolean = false;
        
    }

    export class MenuItem extends cui.Component
    {
        public selected:boolean = false;
        public sound:string = "";
    }

    export class MenuItemImage extends cui.Button
    {
        public tag:number;
    }
}
