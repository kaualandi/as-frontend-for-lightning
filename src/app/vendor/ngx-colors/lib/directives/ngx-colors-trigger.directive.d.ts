import * as i0 from "@angular/core";
import { ComponentRef, ElementRef, EventEmitter } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { NgxColorsColor } from "../clases/color";
import { PanelComponent } from "../components/panel/panel.component";
import { PanelFactoryService } from "../services/panel-factory.service";
export declare class NgxColorsTriggerDirective implements ControlValueAccessor {
  private triggerRef;
  private panelFactory;
  color: string;
  colorsAnimation: "slide-in" | "popup";
  palette: Array<string> | Array<NgxColorsColor>;
  format: string;
  position: "top" | "bottom";
  hideTextInput: boolean;
  hideColorPicker: boolean;
  attachTo: string | undefined;
  overlayClassName: string | undefined;
  colorPickerControls: "default" | "only-alpha" | "no-alpha";
  acceptLabel: string;
  cancelLabel: string;
  change: EventEmitter<string>;
  input: EventEmitter<string>;
  slider: EventEmitter<string>;
  close: EventEmitter<string>;
  open: EventEmitter<string>;
  onClick(): void;
  constructor(triggerRef: ElementRef, panelFactory: PanelFactoryService);
  panelRef: ComponentRef<PanelComponent>;
  isDisabled: boolean;
  onTouchedCallback: () => void;
  onChangeCallback: (_: any) => void;
  openPanel(): void;
  closePanel(): void;
  onChange(): void;
  setDisabledState(isDisabled: boolean): void;
  setColor(color: any): void;
  sliderChange(color: any): void;
  get value(): string;
  set value(value: string);
  writeValue(value: any): void;
  registerOnChange(fn: any): void;
  registerOnTouched(fn: any): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<NgxColorsTriggerDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    NgxColorsTriggerDirective,
    "[ngx-colors-trigger]",
    never,
    {
      colorsAnimation: "colorsAnimation";
      palette: "palette";
      format: "format";
      position: "position";
      hideTextInput: "hideTextInput";
      hideColorPicker: "hideColorPicker";
      attachTo: "attachTo";
      overlayClassName: "overlayClassName";
      colorPickerControls: "colorPickerControls";
      acceptLabel: "acceptLabel";
      cancelLabel: "cancelLabel";
    },
    {
      change: "change";
      input: "input";
      slider: "slider";
      close: "close";
      open: "open";
    },
    never,
    never,
    false
  >;
}
