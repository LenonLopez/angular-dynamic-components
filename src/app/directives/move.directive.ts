import { HostBinding, HostListener, Directive, ElementRef, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import * as $ from 'jquery';
@Directive({
  selector: '[square-move]'
})
export class MoveDirective {

  private bounding;
  private _element;
  down$ = Observable.fromEvent(this._element, 'mousedown');
  up$ = Observable.fromEvent(this._element, 'mouseup');

  move$ = Observable.fromEvent(this._element, 'mousemove')
    .map(mapevent => {
      const offset = $(this._element).offset();
      return {
        x: mapevent['clientX'] - offset.left, //- BALL_OFFSET,
        y: mapevent['pageY'] // - BALL_OFFSET
      };
    });
  constructor(private el: ElementRef, private renderer: Renderer) {

    this._element = this.el.nativeElement;
    this.bounding = this.el.nativeElement.getBoundingClientRect();

  }

  private setPosition(position) {
    this.renderer.setElementStyle(this.el.nativeElement, "top", `${position.top}px`);
    this.renderer.setElementStyle(this.el.nativeElement, "left", `${position.left}px`);
  }


  getNativeElement(element) {
    return element.currentTarget._elementRef.nativeElement;
  }

  //MOUSE EVENTS
  @HostListener("mousedown", ['$event'])
  onMouseDown(event: MouseEvent) {
    console.log("mousedown fired", event, this._element);
    this.down$
      .switchMap(event => this.move$.takeUntil(this.up$))
      .subscribe(position => this.setPosition(position));
  }

}
