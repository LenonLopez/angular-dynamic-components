import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EventEmitter, Component, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import * as $ from 'jquery';

import { Square, Position } from './../models/square.interface';

@Component({
  selector: 'app-square',
  template: `<div class="square"
                #square 
                [ngStyle]="config.position">
                {{config.name}}
                <button (click)="setPosition($event)">set</button>
            </div>
            `,
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  private _OFFSET: number = 50;
  @Input() config: Square;
  @Output() updateConfig: EventEmitter<Square> = new EventEmitter();

  constructor() { }

  setPosition(event) {
    let left = event.target.offsetParent.offsetLeft;
    let top = event.target.offsetParent.offsetTop;
    this.config.position = { top, left };
    this.updateConfig.emit(this.config);
  }


  @ViewChild('square') square;

  ngOnInit() {

    const move$ = Observable.fromEvent(document, 'mousemove')
      .map(event => this.handlePosition(event));

    const touchmove$ = Observable.fromEvent(this.square.nativeElement, 'touchmove')
      .map(event => this.handlePosition(event));

    const touchstart$ = Observable.fromEvent(this.square.nativeElement, 'touchstart');
    const touchend$ = Observable.fromEvent(this.square.nativeElement, 'touchend');
    const down$ = Observable.fromEvent(this.square.nativeElement, 'mousedown');
    const up$ = Observable.fromEvent(document, 'mouseup');

    down$
      .switchMap(event => move$.takeUntil(up$))
      .subscribe(position => this.config.position = position);

    touchstart$
      .switchMap(event => touchmove$.takeUntil(touchend$))
      .subscribe(position => this.config.position = position);
  }

  handlePosition(event) {

    const offset = $(event['target']).offset();
    let top;
    let left;
    if (event.type === 'touchmove') {

      left = event.touches[0].clientX + 'px';
      top = event.touches[0].clientY + 'px';

    }
    else {
      left = `${event['clientX'] - offset.left - this._OFFSET}px`;
      top = `${event['pageY'] - this._OFFSET}px`;
    }

    return { left, top }
  }
}
