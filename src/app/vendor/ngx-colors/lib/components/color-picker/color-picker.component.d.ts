import * as i0 from "@angular/core";
import {
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Hsva } from "../../clases/formats";
import { SliderPosition } from "../../clases/slider";
import { ConverterService } from "../../services/converter.service";
export declare class ColorPickerComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  private service;
  private cdr;
  color: Hsva;
  controls: "default" | "only-alpha" | "no-alpha";
  sliderChange: EventEmitter<Hsva>;
  onAlphaChange: EventEmitter<any>;
  private hsva;
  private outputColor;
  selectedColor: string;
  private fallbackColor;
  private sliderDimMax;
  slider: SliderPosition;
  hueSliderColor: string;
  alphaSliderColor: string;
  hueSlider: ElementRef;
  alphaSlider: ElementRef;
  constructor(service: ConverterService, cdr: ChangeDetectorRef);
  ngOnInit(): void;
  ngOnDestroy(): void;
  ngOnChanges(changes: any): void;
  ngAfterViewInit(): void;
  onSliderChange(type: string, event: any): void;
  setColor(color: any): void;
  getBackgroundColor(color: any): {
    background: string;
  };
  private update;
  static ɵfac: i0.ɵɵFactoryDeclaration<ColorPickerComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    ColorPickerComponent,
    "color-picker",
    never,
    { color: "color"; controls: "controls" },
    { sliderChange: "sliderChange"; onAlphaChange: "onAlphaChange" },
    never,
    never,
    false
  >;
}
