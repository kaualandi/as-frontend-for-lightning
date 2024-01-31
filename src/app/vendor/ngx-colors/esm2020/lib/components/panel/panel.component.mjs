import { Component, ViewChild, HostListener, HostBinding, } from "@angular/core";
import { trigger, transition, query, style, stagger, animate, keyframes, } from "@angular/animations";
import { ColorFormats } from "../../enums/formats";
import { defaultColors } from "../../helpers/default-colors";
import { formats } from "../../helpers/formats";
import { Hsva } from "../../clases/formats";
import { NgxColorsColor } from "../../clases/color";
import * as i0 from "@angular/core";
import * as i1 from "../../services/converter.service";
import * as i2 from "@angular/common";
import * as i3 from "../color-picker/color-picker.component";
export class PanelComponent {
    click(event) {
        if (this.isOutside(event)) {
            this.emitClose("cancel");
        }
    }
    onScroll() {
        this.onScreenMovement();
    }
    onResize() {
        this.onScreenMovement();
    }
    constructor(service, cdr) {
        this.service = service;
        this.cdr = cdr;
        this.color = "#000000";
        this.previewColor = "#000000";
        this.hsva = new Hsva(0, 1, 1, 1);
        this.colorsAnimationEffect = "slide-in";
        this.palette = defaultColors;
        this.variants = [];
        this.colorFormats = formats;
        this.format = ColorFormats.HEX;
        this.canChangeFormat = true;
        this.menu = 1;
        this.hideColorPicker = false;
        this.hideTextInput = false;
        this.colorPickerControls = "default";
    }
    ngOnInit() {
        this.setPosition();
        this.hsva = this.service.stringToHsva(this.color);
        this.indexSeleccionado = this.findIndexSelectedColor(this.palette);
    }
    ngAfterViewInit() {
        this.setPositionY();
    }
    onScreenMovement() {
        this.setPosition();
        this.setPositionY();
        if (!this.panelRef.nativeElement.style.transition) {
            this.panelRef.nativeElement.style.transition = "transform 0.5s ease-out";
        }
    }
    findIndexSelectedColor(colors) {
        let resultIndex = undefined;
        if (this.color) {
            for (let i = 0; i < colors.length; i++) {
                const color = colors[i];
                if (typeof color == "string") {
                    if (this.service.stringToFormat(this.color, ColorFormats.HEX) ==
                        this.service.stringToFormat(color, ColorFormats.HEX)) {
                        resultIndex = i;
                    }
                }
                else if (color === undefined) {
                    this.color = undefined;
                }
                else {
                    if (this.findIndexSelectedColor(color.variants) != undefined) {
                        resultIndex = i;
                    }
                }
            }
        }
        return resultIndex;
    }
    iniciate(triggerInstance, triggerElementRef, color, palette, animation, format, hideTextInput, hideColorPicker, acceptLabel, cancelLabel, colorPickerControls, position) {
        this.colorPickerControls = colorPickerControls;
        this.triggerInstance = triggerInstance;
        this.TriggerBBox = triggerElementRef;
        this.color = color;
        this.hideColorPicker = hideColorPicker;
        this.hideTextInput = hideTextInput;
        this.acceptLabel = acceptLabel;
        this.cancelLabel = cancelLabel;
        if (format) {
            if (formats.includes(format)) {
                this.format = formats.indexOf(format.toLowerCase());
                this.canChangeFormat = false;
                if (this.service.getFormatByString(this.color) != format.toLowerCase()) {
                    this.setColor(this.service.stringToHsva(this.color));
                }
            }
            else {
                console.error("Format provided is invalid, using HEX");
                this.format = ColorFormats.HEX;
            }
        }
        else {
            this.format = formats.indexOf(this.service.getFormatByString(this.color));
        }
        this.previewColor = this.color;
        this.palette = palette ?? defaultColors;
        this.colorsAnimationEffect = animation;
        if (position == "top") {
            let TriggerBBox = this.TriggerBBox.nativeElement.getBoundingClientRect();
            this.positionString =
                "transform: translateY(calc( -100% - " + TriggerBBox.height + "px ))";
        }
    }
    setPosition() {
        if (this.TriggerBBox) {
            const panelWidth = 250;
            const viewportOffset = this.TriggerBBox.nativeElement.getBoundingClientRect();
            this.top = viewportOffset.top + viewportOffset.height;
            if (viewportOffset.left + panelWidth > window.innerWidth) {
                this.left =
                    viewportOffset.right < panelWidth
                        ? window.innerWidth / 2 - panelWidth / 2
                        : viewportOffset.right - panelWidth;
            }
            else {
                this.left = viewportOffset.left;
            }
        }
    }
    setPositionY() {
        const triggerBBox = this.TriggerBBox.nativeElement.getBoundingClientRect();
        const panelBBox = this.panelRef.nativeElement.getBoundingClientRect();
        const panelHeight = panelBBox.height;
        // Check for space below the trigger
        if (triggerBBox.bottom + panelHeight > window.innerHeight) {
            // there is no space, move panel over the trigger
            this.positionString =
                triggerBBox.top < panelBBox.height
                    ? "transform: translateY(-" + triggerBBox.bottom + "px );"
                    : "transform: translateY(calc( -100% - " +
                        triggerBBox.height +
                        "px ));";
        }
        else {
            this.positionString = "";
        }
        this.cdr.detectChanges();
    }
    hasVariant(color) {
        if (!this.previewColor) {
            return false;
        }
        return (typeof color != "string" &&
            color.variants.some((v) => v.toUpperCase() == this.previewColor.toUpperCase()));
    }
    isSelected(color) {
        if (!this.previewColor) {
            return false;
        }
        return (typeof color == "string" &&
            color.toUpperCase() == this.previewColor.toUpperCase());
    }
    getBackgroundColor(color) {
        if (typeof color == "string") {
            return { background: color };
        }
        else {
            return { background: color?.preview };
        }
    }
    onAlphaChange(event) {
        this.palette = this.ChangeAlphaOnPalette(event, this.palette);
    }
    ChangeAlphaOnPalette(alpha, colors) {
        var result = [];
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            if (typeof color == "string") {
                let newColor = this.service.stringToHsva(color);
                newColor.onAlphaChange(alpha);
                result.push(this.service.toFormat(newColor, this.format));
            }
            else {
                let newColor = new NgxColorsColor();
                let newColorPreview = this.service.stringToHsva(color.preview);
                newColorPreview.onAlphaChange(alpha);
                newColor.preview = this.service.toFormat(newColorPreview, this.format);
                newColor.variants = this.ChangeAlphaOnPalette(alpha, color.variants);
                result.push(newColor);
            }
        }
        return result;
    }
    /**
     * Change color from default colors
     * @param string color
     */
    changeColor(color) {
        this.setColor(this.service.stringToHsva(color));
        // this.triggerInstance.onChange();
        this.emitClose("accept");
    }
    onChangeColorPicker(event) {
        this.temporalColor = event;
        this.color = this.service.toFormat(event, this.format);
        // this.setColor(event);
        this.triggerInstance.sliderChange(this.service.toFormat(event, this.format));
    }
    changeColorManual(color) {
        this.previewColor = color;
        this.color = color;
        this.hsva = this.service.stringToHsva(color);
        this.temporalColor = this.hsva;
        this.triggerInstance.setColor(this.color);
        // this.triggerInstance.onChange();
    }
    setColor(value) {
        this.hsva = value;
        this.color = this.service.toFormat(value, this.format);
        this.setPreviewColor(value);
        this.triggerInstance.setColor(this.color);
    }
    setPreviewColor(value) {
        this.previewColor = value
            ? this.service.hsvaToRgba(value).toString()
            : undefined;
    }
    onChange() {
        // this.triggerInstance.onChange();
    }
    onColorClick(color) {
        if (typeof color == "string" || color === undefined) {
            this.changeColor(color);
        }
        else {
            this.variants = color.variants;
            this.menu = 2;
        }
    }
    addColor() {
        this.menu = 3;
        this.backupColor = this.color;
        // this.color = "#FF0000";
        this.temporalColor = this.service.stringToHsva(this.color);
    }
    nextFormat() {
        if (this.canChangeFormat) {
            this.format = (this.format + 1) % this.colorFormats.length;
            this.setColor(this.hsva);
        }
    }
    emitClose(status) {
        if (this.menu == 3) {
            if (status == "cancel") {
            }
            else if (status == "accept") {
                this.setColor(this.temporalColor);
            }
        }
        this.triggerInstance.closePanel();
    }
    onClickBack() {
        if (this.menu == 3) {
            this.color = this.backupColor;
            this.hsva = this.service.stringToHsva(this.color);
        }
        this.indexSeleccionado = this.findIndexSelectedColor(this.palette);
        this.menu = 1;
    }
    isOutside(event) {
        return event.target.classList.contains("ngx-colors-overlay");
    }
}
PanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelComponent, deps: [{ token: i1.ConverterService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: PanelComponent, selector: "ngx-colors-panel", host: { listeners: { "document:mousedown": "click($event)", "document:scroll": "onScroll()", "window:resize": "onResize()" }, properties: { "style.top.px": "this.top", "style.left.px": "this.left" } }, viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["dialog"], descendants: true }], ngImport: i0, template: "<div class=\"opened\" [style]=\"positionString\" #dialog>\n  <ng-container *ngIf=\"menu == 1\">\n    <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n      <ng-container *ngFor=\"let color of palette; let i = index\">\n        <div class=\"circle wrapper color\">\n          <div\n            (click)=\"onColorClick(color)\"\n            class=\"circle color circle-border\"\n            [class.colornull]=\"!color\"\n            [ngStyle]=\"getBackgroundColor(color)\"\n          >\n            <div *ngIf=\"i == this.indexSeleccionado\" class=\"selected\"></div>\n          </div>\n        </div>\n      </ng-container>\n      <div\n        style=\"background: rgb(245 245 245); position: relative\"\n        (click)=\"addColor()\"\n        *ngIf=\"!hideColorPicker && this.colorPickerControls != 'only-alpha'\"\n        class=\"circle button\"\n      >\n        <div\n          *ngIf=\"!this.indexSeleccionado\"\n          style=\"\n            position: absolute;\n            height: 7px;\n            width: 7px;\n            border: 1px solid rgba(0, 0, 0, 0.03);\n            border-radius: 100%;\n            top: 0;\n            right: 0;\n          \"\n          [ngStyle]=\"getBackgroundColor(color)\"\n        ></div>\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          height=\"24px\"\n          viewBox=\"0 0 24 24\"\n          width=\"24px\"\n          fill=\"#222222\"\n        >\n          <path d=\"M24 24H0V0h24v24z\" fill=\"none\" opacity=\".87\" />\n          <path d=\"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z\" />\n        </svg>\n        <!-- <div class=\"add\">\n          <icons icon=\"add\"></icons>\n        </div> -->\n      </div>\n      <color-picker\n        *ngIf=\"!hideColorPicker && this.colorPickerControls == 'only-alpha'\"\n        [controls]=\"colorPickerControls\"\n        [color]=\"hsva\"\n        (colorChange)=\"onChangeColorPicker($event)\"\n        (onAlphaChange)=\"onAlphaChange($event)\"\n      ></color-picker>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"menu == 2\">\n    <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n      <div class=\"circle wrapper\">\n        <div (click)=\"onClickBack()\" class=\"add\">\n          <svg\n            xmlns=\"http://www.w3.org/2000/svg\"\n            width=\"24\"\n            height=\"24\"\n            viewBox=\"0 0 24 24\"\n          >\n            <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n            <path\n              d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n            />\n          </svg>\n        </div>\n      </div>\n\n      <ng-container *ngFor=\"let variant of variants\">\n        <div class=\"circle wrapper color\">\n          <div\n            [class.colornull]=\"!variant\"\n            (click)=\"changeColor(variant)\"\n            class=\"circle circle-border\"\n            [ngStyle]=\"{ background: variant }\"\n          >\n            <div *ngIf=\"isSelected(variant)\" class=\"selected\"></div>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"menu == 3\">\n    <div class=\"nav-wrapper\">\n      <div\n        (click)=\"onClickBack()\"\n        class=\"round-button button\"\n        style=\"float: left\"\n      >\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          width=\"24\"\n          height=\"24\"\n          viewBox=\"0 0 24 24\"\n        >\n          <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n          <path\n            d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n          />\n        </svg>\n      </div>\n      <button (click)=\"emitClose('cancel')\" style=\"float: right\">\n        {{ cancelLabel }}\n      </button>\n      <button (click)=\"emitClose('accept')\" style=\"float: right\">\n        {{ acceptLabel }}\n      </button>\n    </div>\n    <div class=\"color-picker-wrapper\">\n      <!-- <span [(colorPicker)]=\"color\"></span> -->\n      <color-picker\n        [controls]=\"colorPickerControls\"\n        [color]=\"hsva\"\n        (sliderChange)=\"onChangeColorPicker($event)\"\n      ></color-picker>\n    </div>\n  </ng-container>\n  <div class=\"manual-input-wrapper\" *ngIf=\"!hideTextInput\">\n    <p (click)=\"nextFormat()\">{{ colorFormats[format] }}</p>\n    <div class=\"g-input\">\n      <input\n        placeholder=\"#FFFFFF\"\n        type=\"text\"\n        [value]=\"color\"\n        [style.font-size.px]=\"color && color.length > 23 ? 9 : 10\"\n        [style.letter-spacing.px]=\"color && color.length > 16 ? 0 : 1.5\"\n        (keyup)=\"changeColorManual(paintInput.value)\"\n        (keydown.enter)=\"emitClose('accept')\"\n        #paintInput\n      />\n    </div>\n  </div>\n</div>\n", styles: [":host{position:fixed;z-index:2001}.hidden{display:none}.button{display:flex;align-items:center;justify-content:center}.top{transform:translateY(-100%)}.opened{box-sizing:border-box;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#fff;width:250px;border-radius:5px;position:absolute}.opened button{border:none;font-family:inherit;font-size:12px;background-color:unset;-webkit-user-select:none;user-select:none;padding:10px;letter-spacing:1px;color:#222;border-radius:3px;line-height:20px}.opened button:hover,.opened .button:hover{background-color:#0000000d;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1);transition-property:opacity,background-color;transition-duration:.2s,.2s;transition-timing-function:cubic-bezier(.35,0,.25,1),cubic-bezier(.35,0,.25,1);transition-delay:0s,0s}.opened button:focus{outline:none}.opened .colors{display:flex;flex-wrap:wrap;align-items:center;margin:15px}.opened .colors .circle{height:34px;width:34px;box-sizing:border-box;border-radius:100%;cursor:pointer}.opened .colors .circle .add{font-size:20px;line-height:45px;text-align:center}.opened .colors .circle .selected{border:2px solid white;border-radius:100%;height:28px;width:28px;box-sizing:border-box;margin:2px}.opened .colors .circle.colornull{background:linear-gradient(135deg,rgba(236,236,236,.7) 0%,rgba(236,236,236,.7) 45%,#de0f00 50%,rgba(236,236,236,.7) 55%,rgba(236,236,236,.7) 100%)}.opened .colors .circle.wrapper{margin:0 5px 5px;flex:34px 0 0}.opened .colors .circle.button{margin:0 5px 5px}.opened .colors .circle.wrapper.color{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.opened .colors .circle-border{border:1px solid rgba(0,0,0,.03)}.opened .color-picker-wrapper{margin:5px 15px}.opened .nav-wrapper{overflow:hidden;margin:5px}.opened .nav-wrapper .round-button{padding:5px 0;width:40px;height:40px;box-sizing:border-box;border-radius:100%;text-align:center;line-height:45px}.opened .manual-input-wrapper{display:flex;margin:15px;font-family:sans-serif}.opened .manual-input-wrapper p{margin:0;text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;line-height:48px;width:145px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.opened .manual-input-wrapper .g-input{border:1px solid #e8ebed;height:45px;border-radius:5px;width:100%}.opened .manual-input-wrapper .g-input input{font-size:9px;border:none;width:100%;text-transform:uppercase;outline:none;text-align:center;letter-spacing:1px;color:#595b65;height:100%;border-radius:5px;margin:0;padding:0}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i3.ColorPickerComponent, selector: "color-picker", inputs: ["color", "controls"], outputs: ["sliderChange", "onAlphaChange"] }], animations: [
        trigger("colorsAnimation", [
            transition("void => slide-in", [
                // Initially all colors are hidden
                query(":enter", style({ opacity: 0 }), { optional: true }),
                //slide-in animation
                query(":enter", stagger("10ms", [
                    animate(".3s ease-in", keyframes([
                        style({ opacity: 0, transform: "translatex(-50%)", offset: 0 }),
                        style({
                            opacity: 0.5,
                            transform: "translatex(-10px) scale(1.1)",
                            offset: 0.3,
                        }),
                        style({ opacity: 1, transform: "translatex(0)", offset: 1 }),
                    ])),
                ]), { optional: true }),
            ]),
            //popup animation
            transition("void => popup", [
                query(":enter", style({ opacity: 0, transform: "scale(0)" }), {
                    optional: true,
                }),
                query(":enter", stagger("10ms", [
                    animate("500ms ease-out", keyframes([
                        style({ opacity: 0.5, transform: "scale(.5)", offset: 0.3 }),
                        style({ opacity: 1, transform: "scale(1.1)", offset: 0.8 }),
                        style({ opacity: 1, transform: "scale(1)", offset: 1 }),
                    ])),
                ]), { optional: true }),
            ]),
        ]),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "ngx-colors-panel", animations: [
                        trigger("colorsAnimation", [
                            transition("void => slide-in", [
                                // Initially all colors are hidden
                                query(":enter", style({ opacity: 0 }), { optional: true }),
                                //slide-in animation
                                query(":enter", stagger("10ms", [
                                    animate(".3s ease-in", keyframes([
                                        style({ opacity: 0, transform: "translatex(-50%)", offset: 0 }),
                                        style({
                                            opacity: 0.5,
                                            transform: "translatex(-10px) scale(1.1)",
                                            offset: 0.3,
                                        }),
                                        style({ opacity: 1, transform: "translatex(0)", offset: 1 }),
                                    ])),
                                ]), { optional: true }),
                            ]),
                            //popup animation
                            transition("void => popup", [
                                query(":enter", style({ opacity: 0, transform: "scale(0)" }), {
                                    optional: true,
                                }),
                                query(":enter", stagger("10ms", [
                                    animate("500ms ease-out", keyframes([
                                        style({ opacity: 0.5, transform: "scale(.5)", offset: 0.3 }),
                                        style({ opacity: 1, transform: "scale(1.1)", offset: 0.8 }),
                                        style({ opacity: 1, transform: "scale(1)", offset: 1 }),
                                    ])),
                                ]), { optional: true }),
                            ]),
                        ]),
                    ], template: "<div class=\"opened\" [style]=\"positionString\" #dialog>\n  <ng-container *ngIf=\"menu == 1\">\n    <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n      <ng-container *ngFor=\"let color of palette; let i = index\">\n        <div class=\"circle wrapper color\">\n          <div\n            (click)=\"onColorClick(color)\"\n            class=\"circle color circle-border\"\n            [class.colornull]=\"!color\"\n            [ngStyle]=\"getBackgroundColor(color)\"\n          >\n            <div *ngIf=\"i == this.indexSeleccionado\" class=\"selected\"></div>\n          </div>\n        </div>\n      </ng-container>\n      <div\n        style=\"background: rgb(245 245 245); position: relative\"\n        (click)=\"addColor()\"\n        *ngIf=\"!hideColorPicker && this.colorPickerControls != 'only-alpha'\"\n        class=\"circle button\"\n      >\n        <div\n          *ngIf=\"!this.indexSeleccionado\"\n          style=\"\n            position: absolute;\n            height: 7px;\n            width: 7px;\n            border: 1px solid rgba(0, 0, 0, 0.03);\n            border-radius: 100%;\n            top: 0;\n            right: 0;\n          \"\n          [ngStyle]=\"getBackgroundColor(color)\"\n        ></div>\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          height=\"24px\"\n          viewBox=\"0 0 24 24\"\n          width=\"24px\"\n          fill=\"#222222\"\n        >\n          <path d=\"M24 24H0V0h24v24z\" fill=\"none\" opacity=\".87\" />\n          <path d=\"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z\" />\n        </svg>\n        <!-- <div class=\"add\">\n          <icons icon=\"add\"></icons>\n        </div> -->\n      </div>\n      <color-picker\n        *ngIf=\"!hideColorPicker && this.colorPickerControls == 'only-alpha'\"\n        [controls]=\"colorPickerControls\"\n        [color]=\"hsva\"\n        (colorChange)=\"onChangeColorPicker($event)\"\n        (onAlphaChange)=\"onAlphaChange($event)\"\n      ></color-picker>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"menu == 2\">\n    <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n      <div class=\"circle wrapper\">\n        <div (click)=\"onClickBack()\" class=\"add\">\n          <svg\n            xmlns=\"http://www.w3.org/2000/svg\"\n            width=\"24\"\n            height=\"24\"\n            viewBox=\"0 0 24 24\"\n          >\n            <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n            <path\n              d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n            />\n          </svg>\n        </div>\n      </div>\n\n      <ng-container *ngFor=\"let variant of variants\">\n        <div class=\"circle wrapper color\">\n          <div\n            [class.colornull]=\"!variant\"\n            (click)=\"changeColor(variant)\"\n            class=\"circle circle-border\"\n            [ngStyle]=\"{ background: variant }\"\n          >\n            <div *ngIf=\"isSelected(variant)\" class=\"selected\"></div>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"menu == 3\">\n    <div class=\"nav-wrapper\">\n      <div\n        (click)=\"onClickBack()\"\n        class=\"round-button button\"\n        style=\"float: left\"\n      >\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          width=\"24\"\n          height=\"24\"\n          viewBox=\"0 0 24 24\"\n        >\n          <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n          <path\n            d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n          />\n        </svg>\n      </div>\n      <button (click)=\"emitClose('cancel')\" style=\"float: right\">\n        {{ cancelLabel }}\n      </button>\n      <button (click)=\"emitClose('accept')\" style=\"float: right\">\n        {{ acceptLabel }}\n      </button>\n    </div>\n    <div class=\"color-picker-wrapper\">\n      <!-- <span [(colorPicker)]=\"color\"></span> -->\n      <color-picker\n        [controls]=\"colorPickerControls\"\n        [color]=\"hsva\"\n        (sliderChange)=\"onChangeColorPicker($event)\"\n      ></color-picker>\n    </div>\n  </ng-container>\n  <div class=\"manual-input-wrapper\" *ngIf=\"!hideTextInput\">\n    <p (click)=\"nextFormat()\">{{ colorFormats[format] }}</p>\n    <div class=\"g-input\">\n      <input\n        placeholder=\"#FFFFFF\"\n        type=\"text\"\n        [value]=\"color\"\n        [style.font-size.px]=\"color && color.length > 23 ? 9 : 10\"\n        [style.letter-spacing.px]=\"color && color.length > 16 ? 0 : 1.5\"\n        (keyup)=\"changeColorManual(paintInput.value)\"\n        (keydown.enter)=\"emitClose('accept')\"\n        #paintInput\n      />\n    </div>\n  </div>\n</div>\n", styles: [":host{position:fixed;z-index:2001}.hidden{display:none}.button{display:flex;align-items:center;justify-content:center}.top{transform:translateY(-100%)}.opened{box-sizing:border-box;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#fff;width:250px;border-radius:5px;position:absolute}.opened button{border:none;font-family:inherit;font-size:12px;background-color:unset;-webkit-user-select:none;user-select:none;padding:10px;letter-spacing:1px;color:#222;border-radius:3px;line-height:20px}.opened button:hover,.opened .button:hover{background-color:#0000000d;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1);transition-property:opacity,background-color;transition-duration:.2s,.2s;transition-timing-function:cubic-bezier(.35,0,.25,1),cubic-bezier(.35,0,.25,1);transition-delay:0s,0s}.opened button:focus{outline:none}.opened .colors{display:flex;flex-wrap:wrap;align-items:center;margin:15px}.opened .colors .circle{height:34px;width:34px;box-sizing:border-box;border-radius:100%;cursor:pointer}.opened .colors .circle .add{font-size:20px;line-height:45px;text-align:center}.opened .colors .circle .selected{border:2px solid white;border-radius:100%;height:28px;width:28px;box-sizing:border-box;margin:2px}.opened .colors .circle.colornull{background:linear-gradient(135deg,rgba(236,236,236,.7) 0%,rgba(236,236,236,.7) 45%,#de0f00 50%,rgba(236,236,236,.7) 55%,rgba(236,236,236,.7) 100%)}.opened .colors .circle.wrapper{margin:0 5px 5px;flex:34px 0 0}.opened .colors .circle.button{margin:0 5px 5px}.opened .colors .circle.wrapper.color{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.opened .colors .circle-border{border:1px solid rgba(0,0,0,.03)}.opened .color-picker-wrapper{margin:5px 15px}.opened .nav-wrapper{overflow:hidden;margin:5px}.opened .nav-wrapper .round-button{padding:5px 0;width:40px;height:40px;box-sizing:border-box;border-radius:100%;text-align:center;line-height:45px}.opened .manual-input-wrapper{display:flex;margin:15px;font-family:sans-serif}.opened .manual-input-wrapper p{margin:0;text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;line-height:48px;width:145px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.opened .manual-input-wrapper .g-input{border:1px solid #e8ebed;height:45px;border-radius:5px;width:100%}.opened .manual-input-wrapper .g-input input{font-size:9px;border:none;width:100%;text-transform:uppercase;outline:none;text-align:center;letter-spacing:1px;color:#595b65;height:100%;border-radius:5px;margin:0;padding:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { click: [{
                type: HostListener,
                args: ["document:mousedown", ["$event"]]
            }], onScroll: [{
                type: HostListener,
                args: ["document:scroll"]
            }], onResize: [{
                type: HostListener,
                args: ["window:resize"]
            }], top: [{
                type: HostBinding,
                args: ["style.top.px"]
            }], left: [{
                type: HostBinding,
                args: ["style.left.px"]
            }], panelRef: [{
                type: ViewChild,
                args: ["dialog"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFNVCxTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDVixLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxHQUNWLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7QUFzRHBELE1BQU0sT0FBTyxjQUFjO0lBRXpCLEtBQUssQ0FBQyxLQUFLO1FBQ1QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBR0QsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIs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QUFlO2dCQUtPLEdBQUc7c0JBQXRDLFdBQVc7dUJBQUMsY0FBYztnQkFDVSxJQUFJO3NCQUF4QyxXQUFXO3VCQUFDLGVBQWU7Z0JBQ1AsUUFBUTtzQkFBNUIsU0FBUzt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBIb3N0QmluZGluZyxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHRyYW5zaXRpb24sXG4gIHF1ZXJ5LFxuICBzdHlsZSxcbiAgc3RhZ2dlcixcbiAgYW5pbWF0ZSxcbiAga2V5ZnJhbWVzLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHsgaXNEZXNjZW5kYW50T3JTYW1lIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvaGVscGVyc1wiO1xuaW1wb3J0IHsgQ29sb3JGb3JtYXRzIH0gZnJvbSBcIi4uLy4uL2VudW1zL2Zvcm1hdHNcIjtcbmltcG9ydCB7IENvbnZlcnRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29udmVydGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IGRlZmF1bHRDb2xvcnMgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9kZWZhdWx0LWNvbG9yc1wiO1xuaW1wb3J0IHsgZm9ybWF0cyB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2Zvcm1hdHNcIjtcbmltcG9ydCB7IE5neENvbG9yc1RyaWdnZXJEaXJlY3RpdmUgfSBmcm9tIFwiLi4vLi4vZGlyZWN0aXZlcy9uZ3gtY29sb3JzLXRyaWdnZXIuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBIc3ZhIH0gZnJvbSBcIi4uLy4uL2NsYXNlcy9mb3JtYXRzXCI7XG5pbXBvcnQgeyBOZ3hDb2xvcnNDb2xvciB9IGZyb20gXCIuLi8uLi9jbGFzZXMvY29sb3JcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm5neC1jb2xvcnMtcGFuZWxcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYW5lbC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vcGFuZWwuY29tcG9uZW50LnNjc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiY29sb3JzQW5pbWF0aW9uXCIsIFtcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+IHNsaWRlLWluXCIsIFtcbiAgICAgICAgLy8gSW5pdGlhbGx5IGFsbCBjb2xvcnMgYXJlIGhpZGRlblxuICAgICAgICBxdWVyeShcIjplbnRlclwiLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSksIHsgb3B0aW9uYWw6IHRydWUgfSksXG4gICAgICAgIC8vc2xpZGUtaW4gYW5pbWF0aW9uXG4gICAgICAgIHF1ZXJ5KFxuICAgICAgICAgIFwiOmVudGVyXCIsXG4gICAgICAgICAgc3RhZ2dlcihcIjEwbXNcIiwgW1xuICAgICAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAgICAgXCIuM3MgZWFzZS1pblwiLFxuICAgICAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZXgoLTUwJSlcIiwgb2Zmc2V0OiAwIH0pLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGV4KC0xMHB4KSBzY2FsZSgxLjEpXCIsXG4gICAgICAgICAgICAgICAgICBvZmZzZXQ6IDAuMyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEsIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGV4KDApXCIsIG9mZnNldDogMSB9KSxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgXSksXG4gICAgICAgICAgeyBvcHRpb25hbDogdHJ1ZSB9XG4gICAgICAgICksXG4gICAgICBdKSxcbiAgICAgIC8vcG9wdXAgYW5pbWF0aW9uXG4gICAgICB0cmFuc2l0aW9uKFwidm9pZCA9PiBwb3B1cFwiLCBbXG4gICAgICAgIHF1ZXJ5KFwiOmVudGVyXCIsIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiBcInNjYWxlKDApXCIgfSksIHtcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5KFxuICAgICAgICAgIFwiOmVudGVyXCIsXG4gICAgICAgICAgc3RhZ2dlcihcIjEwbXNcIiwgW1xuICAgICAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAgICAgXCI1MDBtcyBlYXNlLW91dFwiLFxuICAgICAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMC41LCB0cmFuc2Zvcm06IFwic2NhbGUoLjUpXCIsIG9mZnNldDogMC4zIH0pLFxuICAgICAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiBcInNjYWxlKDEuMSlcIiwgb2Zmc2V0OiAwLjggfSksXG4gICAgICAgICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06IFwic2NhbGUoMSlcIiwgb2Zmc2V0OiAxIH0pLFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICAgICAgKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0TGlzdGVuZXIoXCJkb2N1bWVudDptb3VzZWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICBjbGljayhldmVudCkge1xuICAgIGlmICh0aGlzLmlzT3V0c2lkZShldmVudCkpIHtcbiAgICAgIHRoaXMuZW1pdENsb3NlKFwiY2FuY2VsXCIpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoXCJkb2N1bWVudDpzY3JvbGxcIilcbiAgb25TY3JvbGwoKSB7XG4gICAgdGhpcy5vblNjcmVlbk1vdmVtZW50KCk7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIilcbiAgb25SZXNpemUoKSB7XG4gICAgdGhpcy5vblNjcmVlbk1vdmVtZW50KCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoXCJzdHlsZS50b3AucHhcIikgcHVibGljIHRvcDogbnVtYmVyO1xuICBASG9zdEJpbmRpbmcoXCJzdHlsZS5sZWZ0LnB4XCIpIHB1YmxpYyBsZWZ0OiBudW1iZXI7XG4gIEBWaWV3Q2hpbGQoXCJkaWFsb2dcIikgcGFuZWxSZWY6IEVsZW1lbnRSZWY7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZXJ2aWNlOiBDb252ZXJ0ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgcHVibGljIGNvbG9yID0gXCIjMDAwMDAwXCI7XG4gIHB1YmxpYyBwcmV2aWV3Q29sb3I6IHN0cmluZyA9IFwiIzAwMDAwMFwiO1xuICBwdWJsaWMgaHN2YSA9IG5ldyBIc3ZhKDAsIDEsIDEsIDEpO1xuXG4gIHB1YmxpYyBjb2xvcnNBbmltYXRpb25FZmZlY3QgPSBcInNsaWRlLWluXCI7XG5cbiAgcHVibGljIHBhbGV0dGUgPSBkZWZhdWx0Q29sb3JzO1xuICBwdWJsaWMgdmFyaWFudHMgPSBbXTtcblxuICBwdWJsaWMgY29sb3JGb3JtYXRzID0gZm9ybWF0cztcbiAgcHVibGljIGZvcm1hdDogQ29sb3JGb3JtYXRzID0gQ29sb3JGb3JtYXRzLkhFWDtcblxuICBwdWJsaWMgY2FuQ2hhbmdlRm9ybWF0OiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgbWVudSA9IDE7XG5cbiAgcHVibGljIGhpZGVDb2xvclBpY2tlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaGlkZVRleHRJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgYWNjZXB0TGFiZWw6IHN0cmluZztcbiAgcHVibGljIGNhbmNlbExhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBjb2xvclBpY2tlckNvbnRyb2xzOiBcImRlZmF1bHRcIiB8IFwib25seS1hbHBoYVwiIHwgXCJuby1hbHBoYVwiID0gXCJkZWZhdWx0XCI7XG4gIHByaXZhdGUgdHJpZ2dlckluc3RhbmNlOiBOZ3hDb2xvcnNUcmlnZ2VyRGlyZWN0aXZlO1xuICBwcml2YXRlIFRyaWdnZXJCQm94O1xuICBwdWJsaWMgaXNTZWxlY3RlZENvbG9ySW5QYWxldHRlOiBib29sZWFuO1xuICBwdWJsaWMgaW5kZXhTZWxlY2Npb25hZG87XG4gIHB1YmxpYyBwb3NpdGlvblN0cmluZztcbiAgcHVibGljIHRlbXBvcmFsQ29sb3I7XG4gIHB1YmxpYyBiYWNrdXBDb2xvcjtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvbigpO1xuICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jb2xvcik7XG4gICAgdGhpcy5pbmRleFNlbGVjY2lvbmFkbyA9IHRoaXMuZmluZEluZGV4U2VsZWN0ZWRDb2xvcih0aGlzLnBhbGV0dGUpO1xuICB9XG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvblkoKTtcbiAgfVxuXG4gIHByaXZhdGUgb25TY3JlZW5Nb3ZlbWVudCgpIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgdGhpcy5zZXRQb3NpdGlvblkoKTtcbiAgICBpZiAoIXRoaXMucGFuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLnBhbmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtIDAuNXMgZWFzZS1vdXRcIjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRJbmRleFNlbGVjdGVkQ29sb3IoY29sb3JzKTogbnVtYmVyIHtcbiAgICBsZXQgcmVzdWx0SW5kZXggPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuY29sb3IpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldO1xuICAgICAgICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Gb3JtYXQodGhpcy5jb2xvciwgQ29sb3JGb3JtYXRzLkhFWCkgPT1cbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zdHJpbmdUb0Zvcm1hdChjb2xvciwgQ29sb3JGb3JtYXRzLkhFWClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc3VsdEluZGV4ID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuY29sb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuZmluZEluZGV4U2VsZWN0ZWRDb2xvcihjb2xvci52YXJpYW50cykgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHRJbmRleCA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRJbmRleDtcbiAgfVxuXG4gIHB1YmxpYyBpbmljaWF0ZShcbiAgICB0cmlnZ2VySW5zdGFuY2U6IE5neENvbG9yc1RyaWdnZXJEaXJlY3RpdmUsXG4gICAgdHJpZ2dlckVsZW1lbnRSZWYsXG4gICAgY29sb3IsXG4gICAgcGFsZXR0ZSxcbiAgICBhbmltYXRpb24sXG4gICAgZm9ybWF0OiBzdHJpbmcsXG4gICAgaGlkZVRleHRJbnB1dDogYm9vbGVhbixcbiAgICBoaWRlQ29sb3JQaWNrZXI6IGJvb2xlYW4sXG4gICAgYWNjZXB0TGFiZWw6IHN0cmluZyxcbiAgICBjYW5jZWxMYWJlbDogc3RyaW5nLFxuICAgIGNvbG9yUGlja2VyQ29udHJvbHM6IFwiZGVmYXVsdFwiIHwgXCJvbmx5LWFscGhhXCIgfCBcIm5vLWFscGhhXCIsXG4gICAgcG9zaXRpb246IFwidG9wXCIgfCBcImJvdHRvbVwiXG4gICkge1xuICAgIHRoaXMuY29sb3JQaWNrZXJDb250cm9scyA9IGNvbG9yUGlja2VyQ29udHJvbHM7XG4gICAgdGhpcy50cmlnZ2VySW5zdGFuY2UgPSB0cmlnZ2VySW5zdGFuY2U7XG4gICAgdGhpcy5UcmlnZ2VyQkJveCA9IHRyaWdnZXJFbGVtZW50UmVmO1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLmhpZGVDb2xvclBpY2tlciA9IGhpZGVDb2xvclBpY2tlcjtcbiAgICB0aGlzLmhpZGVUZXh0SW5wdXQgPSBoaWRlVGV4dElucHV0O1xuICAgIHRoaXMuYWNjZXB0TGFiZWwgPSBhY2NlcHRMYWJlbDtcbiAgICB0aGlzLmNhbmNlbExhYmVsID0gY2FuY2VsTGFiZWw7XG4gICAgaWYgKGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdHMuaW5jbHVkZXMoZm9ybWF0KSkge1xuICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdHMuaW5kZXhPZihmb3JtYXQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHRoaXMuY2FuQ2hhbmdlRm9ybWF0ID0gZmFsc2U7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Rm9ybWF0QnlTdHJpbmcodGhpcy5jb2xvcikgIT0gZm9ybWF0LnRvTG93ZXJDYXNlKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKHRoaXMuY29sb3IpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZvcm1hdCBwcm92aWRlZCBpcyBpbnZhbGlkLCB1c2luZyBIRVhcIik7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gQ29sb3JGb3JtYXRzLkhFWDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtYXQgPSBmb3JtYXRzLmluZGV4T2YodGhpcy5zZXJ2aWNlLmdldEZvcm1hdEJ5U3RyaW5nKHRoaXMuY29sb3IpKTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZpZXdDb2xvciA9IHRoaXMuY29sb3I7XG4gICAgdGhpcy5wYWxldHRlID0gcGFsZXR0ZSA/PyBkZWZhdWx0Q29sb3JzO1xuICAgIHRoaXMuY29sb3JzQW5pbWF0aW9uRWZmZWN0ID0gYW5pbWF0aW9uO1xuICAgIGlmIChwb3NpdGlvbiA9PSBcInRvcFwiKSB7XG4gICAgICBsZXQgVHJpZ2dlckJCb3ggPSB0aGlzLlRyaWdnZXJCQm94Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLnBvc2l0aW9uU3RyaW5nID1cbiAgICAgICAgXCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoY2FsYyggLTEwMCUgLSBcIiArIFRyaWdnZXJCQm94LmhlaWdodCArIFwicHggKSlcIjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0UG9zaXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuVHJpZ2dlckJCb3gpIHtcbiAgICAgIGNvbnN0IHBhbmVsV2lkdGggPSAyNTA7XG4gICAgICBjb25zdCB2aWV3cG9ydE9mZnNldCA9XG4gICAgICAgIHRoaXMuVHJpZ2dlckJCb3gubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMudG9wID0gdmlld3BvcnRPZmZzZXQudG9wICsgdmlld3BvcnRPZmZzZXQuaGVpZ2h0O1xuICAgICAgaWYgKHZpZXdwb3J0T2Zmc2V0LmxlZnQgKyBwYW5lbFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgdGhpcy5sZWZ0ID1cbiAgICAgICAgICB2aWV3cG9ydE9mZnNldC5yaWdodCA8IHBhbmVsV2lkdGhcbiAgICAgICAgICAgID8gd2luZG93LmlubmVyV2lkdGggLyAyIC0gcGFuZWxXaWR0aCAvIDJcbiAgICAgICAgICAgIDogdmlld3BvcnRPZmZzZXQucmlnaHQgLSBwYW5lbFdpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZWZ0ID0gdmlld3BvcnRPZmZzZXQubGVmdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFBvc2l0aW9uWSgpOiB2b2lkIHtcbiAgICBjb25zdCB0cmlnZ2VyQkJveCA9IHRoaXMuVHJpZ2dlckJCb3gubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwYW5lbEJCb3ggPSB0aGlzLnBhbmVsUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcGFuZWxIZWlnaHQgPSBwYW5lbEJCb3guaGVpZ2h0O1xuICAgIC8vIENoZWNrIGZvciBzcGFjZSBiZWxvdyB0aGUgdHJpZ2dlclxuICAgIGlmICh0cmlnZ2VyQkJveC5ib3R0b20gKyBwYW5lbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgLy8gdGhlcmUgaXMgbm8gc3BhY2UsIG1vdmUgcGFuZWwgb3ZlciB0aGUgdHJpZ2dlclxuICAgICAgdGhpcy5wb3NpdGlvblN0cmluZyA9XG4gICAgICAgIHRyaWdnZXJCQm94LnRvcCA8IHBhbmVsQkJveC5oZWlnaHRcbiAgICAgICAgICA/IFwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKC1cIiArIHRyaWdnZXJCQm94LmJvdHRvbSArIFwicHggKTtcIlxuICAgICAgICAgIDogXCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoY2FsYyggLTEwMCUgLSBcIiArXG4gICAgICAgICAgICB0cmlnZ2VyQkJveC5oZWlnaHQgK1xuICAgICAgICAgICAgXCJweCApKTtcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3NpdGlvblN0cmluZyA9IFwiXCI7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNWYXJpYW50KGNvbG9yKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnByZXZpZXdDb2xvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIGNvbG9yICE9IFwic3RyaW5nXCIgJiZcbiAgICAgIGNvbG9yLnZhcmlhbnRzLnNvbWUoXG4gICAgICAgICh2KSA9PiB2LnRvVXBwZXJDYXNlKCkgPT0gdGhpcy5wcmV2aWV3Q29sb3IudG9VcHBlckNhc2UoKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZChjb2xvcikge1xuICAgIGlmICghdGhpcy5wcmV2aWV3Q29sb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBjb2xvciA9PSBcInN0cmluZ1wiICYmXG4gICAgICBjb2xvci50b1VwcGVyQ2FzZSgpID09IHRoaXMucHJldmlld0NvbG9yLnRvVXBwZXJDYXNlKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldEJhY2tncm91bmRDb2xvcihjb2xvcikge1xuICAgIGlmICh0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHsgYmFja2dyb3VuZDogY29sb3IgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgYmFja2dyb3VuZDogY29sb3I/LnByZXZpZXcgfTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25BbHBoYUNoYW5nZShldmVudCkge1xuICAgIHRoaXMucGFsZXR0ZSA9IHRoaXMuQ2hhbmdlQWxwaGFPblBhbGV0dGUoZXZlbnQsIHRoaXMucGFsZXR0ZSk7XG4gIH1cblxuICBwcml2YXRlIENoYW5nZUFscGhhT25QYWxldHRlKFxuICAgIGFscGhhLFxuICAgIGNvbG9yczogQXJyYXk8c3RyaW5nIHwgTmd4Q29sb3JzQ29sb3I+XG4gICk6IEFycmF5PGFueT4ge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY29sb3IgPSBjb2xvcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgbGV0IG5ld0NvbG9yID0gdGhpcy5zZXJ2aWNlLnN0cmluZ1RvSHN2YShjb2xvcik7XG4gICAgICAgIG5ld0NvbG9yLm9uQWxwaGFDaGFuZ2UoYWxwaGEpO1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLnNlcnZpY2UudG9Gb3JtYXQobmV3Q29sb3IsIHRoaXMuZm9ybWF0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmV3Q29sb3IgPSBuZXcgTmd4Q29sb3JzQ29sb3IoKTtcbiAgICAgICAgbGV0IG5ld0NvbG9yUHJldmlldyA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEoY29sb3IucHJldmlldyk7XG4gICAgICAgIG5ld0NvbG9yUHJldmlldy5vbkFscGhhQ2hhbmdlKGFscGhhKTtcbiAgICAgICAgbmV3Q29sb3IucHJldmlldyA9IHRoaXMuc2VydmljZS50b0Zvcm1hdChuZXdDb2xvclByZXZpZXcsIHRoaXMuZm9ybWF0KTtcbiAgICAgICAgbmV3Q29sb3IudmFyaWFudHMgPSB0aGlzLkNoYW5nZUFscGhhT25QYWxldHRlKGFscGhhLCBjb2xvci52YXJpYW50cyk7XG4gICAgICAgIHJlc3VsdC5wdXNoKG5ld0NvbG9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgY29sb3IgZnJvbSBkZWZhdWx0IGNvbG9yc1xuICAgKiBAcGFyYW0gc3RyaW5nIGNvbG9yXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlQ29sb3IoY29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q29sb3IodGhpcy5zZXJ2aWNlLnN0cmluZ1RvSHN2YShjb2xvcikpO1xuICAgIC8vIHRoaXMudHJpZ2dlckluc3RhbmNlLm9uQ2hhbmdlKCk7XG4gICAgdGhpcy5lbWl0Q2xvc2UoXCJhY2NlcHRcIik7XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2VDb2xvclBpY2tlcihldmVudDogSHN2YSkge1xuICAgIHRoaXMudGVtcG9yYWxDb2xvciA9IGV2ZW50O1xuICAgIHRoaXMuY29sb3IgPSB0aGlzLnNlcnZpY2UudG9Gb3JtYXQoZXZlbnQsIHRoaXMuZm9ybWF0KTtcbiAgICAvLyB0aGlzLnNldENvbG9yKGV2ZW50KTtcbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZS5zbGlkZXJDaGFuZ2UoXG4gICAgICB0aGlzLnNlcnZpY2UudG9Gb3JtYXQoZXZlbnQsIHRoaXMuZm9ybWF0KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlQ29sb3JNYW51YWwoY29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucHJldmlld0NvbG9yID0gY29sb3I7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEoY29sb3IpO1xuICAgIHRoaXMudGVtcG9yYWxDb2xvciA9IHRoaXMuaHN2YTtcbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZS5zZXRDb2xvcih0aGlzLmNvbG9yKTtcbiAgICAvLyB0aGlzLnRyaWdnZXJJbnN0YW5jZS5vbkNoYW5nZSgpO1xuICB9XG5cbiAgc2V0Q29sb3IodmFsdWU6IEhzdmEpIHtcbiAgICB0aGlzLmhzdmEgPSB2YWx1ZTtcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5zZXJ2aWNlLnRvRm9ybWF0KHZhbHVlLCB0aGlzLmZvcm1hdCk7XG4gICAgdGhpcy5zZXRQcmV2aWV3Q29sb3IodmFsdWUpO1xuICAgIHRoaXMudHJpZ2dlckluc3RhbmNlLnNldENvbG9yKHRoaXMuY29sb3IpO1xuICB9XG5cbiAgc2V0UHJldmlld0NvbG9yKHZhbHVlOiBIc3ZhKSB7XG4gICAgdGhpcy5wcmV2aWV3Q29sb3IgPSB2YWx1ZVxuICAgICAgPyB0aGlzLnNlcnZpY2UuaHN2YVRvUmdiYSh2YWx1ZSkudG9TdHJpbmcoKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cbiAgaHN2YVRvUmdiYTtcbiAgb25DaGFuZ2UoKSB7XG4gICAgLy8gdGhpcy50cmlnZ2VySW5zdGFuY2Uub25DaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbG9yQ2xpY2soY29sb3IpIHtcbiAgICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIgfHwgY29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jaGFuZ2VDb2xvcihjb2xvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFyaWFudHMgPSBjb2xvci52YXJpYW50cztcbiAgICAgIHRoaXMubWVudSA9IDI7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZENvbG9yKCkge1xuICAgIHRoaXMubWVudSA9IDM7XG4gICAgdGhpcy5iYWNrdXBDb2xvciA9IHRoaXMuY29sb3I7XG4gICAgLy8gdGhpcy5jb2xvciA9IFwiI0ZGMDAwMFwiO1xuICAgIHRoaXMudGVtcG9yYWxDb2xvciA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jb2xvcik7XG4gIH1cblxuICBwdWJsaWMgbmV4dEZvcm1hdCgpIHtcbiAgICBpZiAodGhpcy5jYW5DaGFuZ2VGb3JtYXQpIHtcbiAgICAgIHRoaXMuZm9ybWF0ID0gKHRoaXMuZm9ybWF0ICsgMSkgJSB0aGlzLmNvbG9yRm9ybWF0cy5sZW5ndGg7XG4gICAgICB0aGlzLnNldENvbG9yKHRoaXMuaHN2YSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGVtaXRDbG9zZShzdGF0dXM6IFwiY2FuY2VsXCIgfCBcImFjY2VwdFwiKSB7XG4gICAgaWYgKHRoaXMubWVudSA9PSAzKSB7XG4gICAgICBpZiAoc3RhdHVzID09IFwiY2FuY2VsXCIpIHtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09IFwiYWNjZXB0XCIpIHtcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLnRlbXBvcmFsQ29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZS5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBwdWJsaWMgb25DbGlja0JhY2soKSB7XG4gICAgaWYgKHRoaXMubWVudSA9PSAzKSB7XG4gICAgICB0aGlzLmNvbG9yID0gdGhpcy5iYWNrdXBDb2xvcjtcbiAgICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jb2xvcik7XG4gICAgfVxuICAgIHRoaXMuaW5kZXhTZWxlY2Npb25hZG8gPSB0aGlzLmZpbmRJbmRleFNlbGVjdGVkQ29sb3IodGhpcy5wYWxldHRlKTtcbiAgICB0aGlzLm1lbnUgPSAxO1xuICB9XG5cbiAgaXNPdXRzaWRlKGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZ3gtY29sb3JzLW92ZXJsYXlcIik7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJvcGVuZWRcIiBbc3R5bGVdPVwicG9zaXRpb25TdHJpbmdcIiAjZGlhbG9nPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwibWVudSA9PSAxXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbG9yc1wiIFtAY29sb3JzQW5pbWF0aW9uXT1cImNvbG9yc0FuaW1hdGlvbkVmZmVjdFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sb3Igb2YgcGFsZXR0ZTsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlIHdyYXBwZXIgY29sb3JcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAoY2xpY2spPVwib25Db2xvckNsaWNrKGNvbG9yKVwiXG4gICAgICAgICAgICBjbGFzcz1cImNpcmNsZSBjb2xvciBjaXJjbGUtYm9yZGVyXCJcbiAgICAgICAgICAgIFtjbGFzcy5jb2xvcm51bGxdPVwiIWNvbG9yXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEJhY2tncm91bmRDb2xvcihjb2xvcilcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpID09IHRoaXMuaW5kZXhTZWxlY2Npb25hZG9cIiBjbGFzcz1cInNlbGVjdGVkXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZDogcmdiKDI0NSAyNDUgMjQ1KTsgcG9zaXRpb246IHJlbGF0aXZlXCJcbiAgICAgICAgKGNsaWNrKT1cImFkZENvbG9yKClcIlxuICAgICAgICAqbmdJZj1cIiFoaWRlQ29sb3JQaWNrZXIgJiYgdGhpcy5jb2xvclBpY2tlckNvbnRyb2xzICE9ICdvbmx5LWFscGhhJ1wiXG4gICAgICAgIGNsYXNzPVwiY2lyY2xlIGJ1dHRvblwiXG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdJZj1cIiF0aGlzLmluZGV4U2VsZWNjaW9uYWRvXCJcbiAgICAgICAgICBzdHlsZT1cIlxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgaGVpZ2h0OiA3cHg7XG4gICAgICAgICAgICB3aWR0aDogN3B4O1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjAzKTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICBcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEJhY2tncm91bmRDb2xvcihjb2xvcilcIlxuICAgICAgICA+PC9kaXY+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICBoZWlnaHQ9XCIyNHB4XCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICB3aWR0aD1cIjI0cHhcIlxuICAgICAgICAgIGZpbGw9XCIjMjIyMjIyXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMjQgMjRIMFYwaDI0djI0elwiIGZpbGw9XCJub25lXCIgb3BhY2l0eT1cIi44N1wiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNi41OSA4LjU5TDEyIDEzLjE3IDcuNDEgOC41OSA2IDEwbDYgNiA2LTYtMS40MS0xLjQxelwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJhZGRcIj5cbiAgICAgICAgICA8aWNvbnMgaWNvbj1cImFkZFwiPjwvaWNvbnM+XG4gICAgICAgIDwvZGl2PiAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGNvbG9yLXBpY2tlclxuICAgICAgICAqbmdJZj1cIiFoaWRlQ29sb3JQaWNrZXIgJiYgdGhpcy5jb2xvclBpY2tlckNvbnRyb2xzID09ICdvbmx5LWFscGhhJ1wiXG4gICAgICAgIFtjb250cm9sc109XCJjb2xvclBpY2tlckNvbnRyb2xzXCJcbiAgICAgICAgW2NvbG9yXT1cImhzdmFcIlxuICAgICAgICAoY29sb3JDaGFuZ2UpPVwib25DaGFuZ2VDb2xvclBpY2tlcigkZXZlbnQpXCJcbiAgICAgICAgKG9uQWxwaGFDaGFuZ2UpPVwib25BbHBoYUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgID48L2NvbG9yLXBpY2tlcj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJtZW51ID09IDJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sb3JzXCIgW0Bjb2xvcnNBbmltYXRpb25dPVwiY29sb3JzQW5pbWF0aW9uRWZmZWN0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlIHdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiAoY2xpY2spPVwib25DbGlja0JhY2soKVwiIGNsYXNzPVwiYWRkXCI+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgZD1cIk0yMCAxMUg3LjgzbDUuNTktNS41OUwxMiA0bC04IDggOCA4IDEuNDEtMS40MUw3LjgzIDEzSDIwdi0yelwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCB2YXJpYW50IG9mIHZhcmlhbnRzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlciBjb2xvclwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIFtjbGFzcy5jb2xvcm51bGxdPVwiIXZhcmlhbnRcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZUNvbG9yKHZhcmlhbnQpXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2lyY2xlIGNpcmNsZS1ib3JkZXJcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyBiYWNrZ3JvdW5kOiB2YXJpYW50IH1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1NlbGVjdGVkKHZhcmlhbnQpXCIgY2xhc3M9XCJzZWxlY3RlZFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1lbnUgPT0gM1wiPlxuICAgIDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxuICAgICAgPGRpdlxuICAgICAgICAoY2xpY2spPVwib25DbGlja0JhY2soKVwiXG4gICAgICAgIGNsYXNzPVwicm91bmQtYnV0dG9uIGJ1dHRvblwiXG4gICAgICAgIHN0eWxlPVwiZmxvYXQ6IGxlZnRcIlxuICAgICAgPlxuICAgICAgICA8c3ZnXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgd2lkdGg9XCIyNFwiXG4gICAgICAgICAgaGVpZ2h0PVwiMjRcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICA+XG4gICAgICAgICAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9XCJNMjAgMTFINy44M2w1LjU5LTUuNTlMMTIgNGwtOCA4IDggOCAxLjQxLTEuNDFMNy44MyAxM0gyMHYtMnpcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIChjbGljayk9XCJlbWl0Q2xvc2UoJ2NhbmNlbCcpXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cbiAgICAgICAge3sgY2FuY2VsTGFiZWwgfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZW1pdENsb3NlKCdhY2NlcHQnKVwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XG4gICAgICAgIHt7IGFjY2VwdExhYmVsIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sb3ItcGlja2VyLXdyYXBwZXJcIj5cbiAgICAgIDwhLS0gPHNwYW4gWyhjb2xvclBpY2tlcildPVwiY29sb3JcIj48L3NwYW4+IC0tPlxuICAgICAgPGNvbG9yLXBpY2tlclxuICAgICAgICBbY29udHJvbHNdPVwiY29sb3JQaWNrZXJDb250cm9sc1wiXG4gICAgICAgIFtjb2xvcl09XCJoc3ZhXCJcbiAgICAgICAgKHNsaWRlckNoYW5nZSk9XCJvbkNoYW5nZUNvbG9yUGlja2VyKCRldmVudClcIlxuICAgICAgPjwvY29sb3ItcGlja2VyPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGRpdiBjbGFzcz1cIm1hbnVhbC1pbnB1dC13cmFwcGVyXCIgKm5nSWY9XCIhaGlkZVRleHRJbnB1dFwiPlxuICAgIDxwIChjbGljayk9XCJuZXh0Rm9ybWF0KClcIj57eyBjb2xvckZvcm1hdHNbZm9ybWF0XSB9fTwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZy1pbnB1dFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiI0ZGRkZGRlwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgW3ZhbHVlXT1cImNvbG9yXCJcbiAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZS5weF09XCJjb2xvciAmJiBjb2xvci5sZW5ndGggPiAyMyA/IDkgOiAxMFwiXG4gICAgICAgIFtzdHlsZS5sZXR0ZXItc3BhY2luZy5weF09XCJjb2xvciAmJiBjb2xvci5sZW5ndGggPiAxNiA/IDAgOiAxLjVcIlxuICAgICAgICAoa2V5dXApPVwiY2hhbmdlQ29sb3JNYW51YWwocGFpbnRJbnB1dC52YWx1ZSlcIlxuICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJlbWl0Q2xvc2UoJ2FjY2VwdCcpXCJcbiAgICAgICAgI3BhaW50SW5wdXRcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=