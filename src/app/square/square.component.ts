import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EventEmitter,Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit, Renderer, Input, Output } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent{

//@ViewChild('square') square:ElementRef;
@Input() config = { position:null,name:'', id:null };
//@Output() setPosition: EventEmitter<any> = new EventEmitter();



  constructor(private renderer: Renderer) {
    
   }
}
/*
  ngOnInit() {
  }

  ngAfterContentInit(){

  }
  ngAfterViewInit(){
    //this.handleClick.apply()
    //this.renderer.listen(this.square.nativeElement, "click", this.handleClick);

  }

  handleClick(square){
    //needs a lot of work to actually move
    this.config.position ={top:"1px", left:"1px"};
    this.handleSetPosition();
  }
  
  handleMove(square){
      //TODO
  }
 
  handleSetPosition(){
    this.setPosition.emit(this.config);
  }*/
  



