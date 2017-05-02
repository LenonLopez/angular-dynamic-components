import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EventEmitter,Component, Input, Output } from '@angular/core';

import { Square } from './../models/square.interface';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent{

@Input() config:Square;
@Output() updateConfig: EventEmitter<Square> = new EventEmitter();

  constructor(){}
  
   setPosition(event){
     let left = event.target.offsetParent.offsetLeft;
     let top = event.target.offsetParent.offsetTop;
     this.config.position = {top: top,left:left };

     this.updateConfig.emit(this.config);
   }
}
