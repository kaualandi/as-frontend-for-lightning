import * as i0 from "@angular/core";
import { ChangeDetectorRef, ElementRef, OnInit } from "@angular/core";
import { Hsva } from "../../clases/formats";
import { NgxColorsTriggerDirective } from "../../directives/ngx-colors-trigger.directive";
import { ColorFormats } from "../../enums/formats";
import { ConverterService } from "../../services/converter.service";
export declare class PanelComponent implements OnInit {
    service: ConverterService;
    private cdr;
    click(event: any): void;
    onScroll(): void;
    onResize(): void;
    top: number;
    left: number;
    panelRef: ElementRef;
    constructor(service: ConverterService, cdr: ChangeDetectorRef);
    color: string;
    previewColor: string;
    hsva: Hsva;
    colorsAnimationEffect: string;
    palette: {
        color: string;
        preview: string;
        variants: string[];
    }[];
    variants: any[];
    colorFormats: string[];
    format: ColorFormats;
    canChangeFormat: boolean;
    menu: number;
    hideColorPicker: boolean;
    hideTextInput: boolean;
    acceptLabel: string;
    cancelLabel: string;
    colorPickerControls: "default" | "only-alpha" | "no-alpha";
    private triggerInstance;
    private TriggerBBox;
    isSelectedColorInPalette: boolean;
    indexSeleccionado: any;
    positionString: any;
    temporalColor: any;
    backupColor: any;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private onScreenMovement;
    private findIndexSelectedColor;
    iniciate(triggerInstance: NgxColorsTriggerDirective, triggerElementRef: any, color: any, palette: any, animation: any, format: string, hideTextInput: boolean, hideColorPicker: boolean, acceptLabel: string, cancelLabel: string, colorPickerControls: "default" | "only-alpha" | "no-alpha", position: "top" | "bottom"): void;
    setPosition(): void;
    private setPositionY;
    hasVariant(color: any): boolean;
    isSelected(color: any): boolean;
    getBackgroundColor(color: any): {
        background: any;
    };
    onAlphaChange(event: any): void;
    private ChangeAlphaOnPalette;
    /**
     * Change color from default colors
     * @param string color
     */
    changeColor(color: string): void;
    onChangeColorPicker(event: Hsva): void;
    changeColorManual(color: string): void;
    setColor(value: Hsva): void;
    setPreviewColor(value: Hsva): void;
    hsvaToRgba: any;
    onChange(): void;
    onColorClick(color: any): void;
    addColor(): void;
    nextFormat(): void;
    emitClose(status: "cancel" | "accept"): void;
    onClickBack(): void;
    isOutside(event: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PanelComponent, "ngx-colors-panel", never, {}, {}, never, never, false>;
}
