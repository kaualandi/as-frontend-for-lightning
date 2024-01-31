import * as i0 from "@angular/core";
import { ChangeDetectorRef, OnDestroy, OnInit } from "@angular/core";
import { NgxColorsTriggerDirective } from "./directives/ngx-colors-trigger.directive";
export declare class NgxColorsComponent implements OnInit, OnDestroy {
  private cdRef;
  private triggerDirective;
  private triggerDirectiveColorChangeSubscription;
  constructor(
    cdRef: ChangeDetectorRef,
    triggerDirective: NgxColorsTriggerDirective
  );
  ngOnInit(): void;
  ngOnDestroy(): void;
  color: string;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    NgxColorsComponent,
    [null, { host: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    NgxColorsComponent,
    "ngx-colors",
    never,
    {},
    {},
    never,
    never,
    false
  >;
}
