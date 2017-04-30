import { HostBinding, HostListener, Directive, ElementRef } from '@angular/core';

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
  constructor(private el: ElementRef) {
  this.bounding = this.el.nativeElement.getBoundingClientRect();
    
   }
private isSelected: Boolean = false;

@HostListener("mousedown",['$event'])
onMouseDown(event: MouseEvent){
  console.log("MOUSEDOWN");
  this.isSelected = true;
  console.log(event);

}

@HostListener("mousemove",['$event'])
onMouseMove(event: MouseEvent){
  if(this.isSelected){
    console.log("MOUSEMOVE");
    //this.top = `${event.screenY}px`;
    //this.left = `${event.screenY}px`
    this.setPosition(event.y, event.x);

  }
}

@HostListener("mouseup", ["$event"])
onMouseUp(event:MouseEvent){
  console.log("MOUSEUP");
  this.isSelected = false;
}
@HostListener("touchstart",["$event"])
onTouchMove(event:TouchEvent){
  this.isSelected = true;
  console.log(event);
}
@HostListener("touchmove",["$event"])
onTouchDown(event:TouchEvent){
  console.log("TouchMove", event);
  let left = event.touches[0].clientX - this.bounding.left;
  let top = event.touches[0].clientY - this.bounding.top;
  this.setPosition(top, left);
}
@HostListener("touchend",["$event"])
onTouchEnd(event:TouchEvent){
  console.log("TouchEnd");
  this.isSelected = false;
}
/*@HostListener("mouseleave", ["$event"])
onMouseLeave(event:MouseEvent){
  if(this.isSelected){
  console.log("MOUSELEAVE");
  this.isSelected = false;
  }
}*/

private setPosition(top:number, left: number) {
  this.el.nativeElement.style.top = `${top}px`;
  this.el.nativeElement.style.left = `${left}px`;
}

}
