import { HostBinding, HostListener, Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[square-move]'
})
export class MoveDirective {
/*@HostBinding('style.top')
top: string;
@HostBinding('style.left')
left: string;
*/
private bounding; 
  constructor(private el: ElementRef, private renderer:Renderer) {
  this.bounding = this.el.nativeElement.getBoundingClientRect();
    
   }
private isSelected: Boolean = false;
//MOUSE EVENTS
@HostListener("mousedown",['$event'])
onMouseDown(event: MouseEvent){
  event.stopPropagation();
  this.isSelected = true;
}

@HostListener("mousemove",['$event'])
onMouseMove(event: MouseEvent){
  event.stopPropagation();
  if(this.isSelected){
    let left = event.clientX - this.bounding.left;
    let top = event.clientY - this.bounding.top;
    this.setPosition(top, left);
  }
}

@HostListener("mouseup", ["$event"])
onMouseUp(event:MouseEvent){
  event.preventDefault();
  event.stopPropagation();
  this.isSelected = false;
}
@HostListener("mouseleave", ["$event"])
onMouseLeave(event:MouseEvent){
  event.stopPropagation();
  this.isSelected = false;
}

//TOUCH EVENTS
@HostListener("touchstart",["$event"])
onTouchMove(event:TouchEvent){
  event.stopPropagation();
  this.isSelected = true;
}
@HostListener("touchmove",["$event"])
onTouchDown(event:TouchEvent){
  event.preventDefault();
  event.stopPropagation();
  console.log("TouchMove", event);
  if(this.isSelected){
    let left = event.touches[0].clientX - this.bounding.left;
    let top = event.touches[0].clientY - this.bounding.top;
    this.setPosition(top, left);
  }
}
@HostListener("touchend",["$event"])
onTouchEnd(event:TouchEvent){
  event.stopPropagation();
  console.log("TouchEnd");
  this.isSelected = false;
}


private setPosition(top:number, left: number) {
  this.renderer.setElementStyle(this.el.nativeElement,"top",`${top}px`);
  this.renderer.setElementStyle(this.el.nativeElement,"left",`${left}px`);

}

}
