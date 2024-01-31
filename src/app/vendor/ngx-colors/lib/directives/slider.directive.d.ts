import * as i0 from "@angular/core";
import { ElementRef, EventEmitter } from "@angular/core";
export declare class SliderDirective {
  private elRef;
  private listenerMove;
  private listenerStop;
  rgX: number;
  rgY: number;
  slider: string;
  dragEnd: EventEmitter<any>;
  dragStart: EventEmitter<any>;
  newValue: EventEmitter<any>;
  mouseDown(event: any): void;
  touchStart(event: any): void;
  constructor(elRef: ElementRef);
  private move;
  private start;
  private stop;
  private getX;
  private getY;
  private setCursor;
  static ɵfac: i0.ɵɵFactoryDeclaration<SliderDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    SliderDirective,
    "[slider]",
    never,
    { rgX: "rgX"; rgY: "rgY"; slider: "slider" },
    { dragEnd: "dragEnd"; dragStart: "dragStart"; newValue: "newValue" },
    never,
    never,
    false
  >;
}
