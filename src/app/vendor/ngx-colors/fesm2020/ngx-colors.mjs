import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Directive, Input, Output, HostListener, Component, ViewEncapsulation, ViewChild, HostBinding, forwardRef, Host, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

var ColorFormats;
(function (ColorFormats) {
    ColorFormats[ColorFormats["HEX"] = 0] = "HEX";
    ColorFormats[ColorFormats["RGBA"] = 1] = "RGBA";
    ColorFormats[ColorFormats["HSLA"] = 2] = "HSLA";
    ColorFormats[ColorFormats["CMYK"] = 3] = "CMYK";
})(ColorFormats || (ColorFormats = {}));

const defaultColors = [
    {
        color: "rojo", preview: "#E57373", variants: ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350", "#F44336", "#E53935", "#D32F2F", "#C62828"]
    },
    {
        color: "rosa", preview: "#F06292", variants: ["#FCE4EC", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A", "#E91E63", "#D81B60", "#C2185B", "#AD1457"]
    },
    {
        color: "purpura", preview: "#BA68C8", variants: ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA", "#7B1FA2", "#6A1B9A"]
    },
    {
        color: "purpura oscuro", preview: "#9575CD", variants: ["#EDE7F6", "#D1C4E9", "#B39DDB", "#9575CD", "#7E57C2", "#673AB7", "#5E35B1", "#512DA8", "#4527A0"]
    },
    {
        color: "indigo", preview: "#7986CB", variants: ["#E8EAF6", "#C5CAE9", "#9FA8DA", "#7986CB", "#5C6BC0", "#3F51B5", "#3949AB", "#303F9F", "#283593"]
    },
    {
        color: "azul", preview: "#64B5F6", variants: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0"]
    },
    {
        color: "celeste", preview: "#4FC3F7", variants: ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD"]
    },
    {
        color: "cyan", preview: "#4DD0E1", variants: ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#00BCD4", "#00ACC1", "#0097A7", "#00838F"]
    },
    {
        color: "color", preview: "#4DB6AC", variants: ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B", "#00695C"]
    },
    {
        color: "verde", preview: "#81C784", variants: ["#E8F5E9", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50", "#43A047", "#388E3C", "#2E7D32"]
    },
    {
        color: "verde claro", preview: "#AED581", variants: ["#F1F8E9", "#DCEDC8", "#C5E1A5", "#AED581", "#9CCC65", "#8BC34A", "#7CB342", "#689F38", "#558B2F"]
    },
    {
        color: "lima", preview: "#DCE775", variants: ["#F9FBE7", "#F0F4C3", "#E6EE9C", "#DCE775", "#D4E157", "#CDDC39", "#C0CA33", "#AFB42B", "#9E9D24"]
    },
    {
        color: "amarillo", preview: "#FFF176", variants: ["#FFFDE7", "#FFF9C4", "#FFF59D", "#FFF176", "#FFEE58", "#FFEB3B", "#FDD835", "#FBC02D", "#F9A825"]
    },
    {
        color: "ambar", preview: "#FFD54F", variants: ["#FFF8E1", "#FFECB3", "#FFE082", "#FFD54F", "#FFCA28", "#FFC107", "#FFB300", "#FFA000", "#FF8F00"]
    },
    {
        color: "naranja", preview: "#FFB74D", variants: ["#FFF3E0", "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726", "#FF9800", "#FB8C00", "#F57C00", "#EF6C00"]
    },
    {
        color: "naranja oscuro", preview: "#FF8A65", variants: ["#FBE9E7", "#FFCCBC", "#FFAB91", "#FF8A65", "#FF7043", "#FF5722", "#F4511E", "#E64A19", "#D84315"]
    },
    {
        color: "marron", preview: "#A1887F", variants: ["#EFEBE9", "#D7CCC8", "#BCAAA4", "#A1887F", "#8D6E63", "#795548", "#6D4C41", "#5D4037", "#4E342E"]
    },
    {
        color: "escala de grises", preview: "#E0E0E0", variants: ["#FFFFFF", "#FAFAFA", "#F5F5F5", "#EEEEEE", "#E0E0E0", "#BDBDBD", "#9E9E9E", "#757575", "#616161", "#424242", "#000000"]
    },
    {
        color: "azul gris", preview: "#90A4AE", variants: ["#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F"]
    }
];

const formats = ['hex', 'rgba', 'hsla'];

class Rgba {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    denormalize() {
        this.r = Math.round(this.r * 255);
        this.g = Math.round(this.g * 255);
        this.b = Math.round(this.b * 255);
        return this;
    }
    toString() {
        this.denormalize();
        let output = 'rgb' +
            (this.a != 1 ? 'a(' : '(') +
            this.r + ', ' +
            this.g + ', ' +
            this.b +
            (this.a != 1 ? ', ' + this.a.toPrecision(2) + ')' : ')');
        return output;
    }
}
class Hsva {
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
        this.onChange = new EventEmitter(true);
    }
    onColorChange(value) {
        this.s = value.s / value.rgX;
        this.v = value.v / value.rgY;
    }
    onHueChange(value) {
        this.h = value.v / value.rgX;
        // this.sliderH = this.hsva.h;
    }
    onValueChange(value) {
        this.v = value.v / value.rgX;
    }
    onAlphaChange(value) {
        this.a = value.v / value.rgX;
    }
}
class Hsla {
    constructor(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
    denormalize() {
        this.h = Math.round(this.h * 360);
        this.s = Math.round(this.s * 100);
        this.l = Math.round(this.l * 100);
        return this;
    }
    toString() {
        let output = 'hsl' +
            (this.a != 1 ? 'a(' : '(') +
            this.h + ', ' +
            this.s + '%, ' +
            this.l + '%' +
            (this.a != 1 ? ', ' + this.a.toPrecision(2) + ')' : ')');
        return output;
    }
}
class Cmyk {
    constructor(c, m, y, k, a = 1) {
        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;
        this.a = a;
    }
}

class NgxColorsColor {
    constructor(params) {
        if (params) {
            this.preview = params.preview;
            this.variants = params.variants;
        }
    }
}

class ConverterService {
    // private active: ColorPickerComponent | null = null;
    constructor() { }
    // public setActive(active: ColorPickerComponent | null): void {
    //   this.active = active;
    // }
    toFormat(hsva, format) {
        var output = "";
        if (hsva) {
            switch (format) {
                case ColorFormats.HEX:
                    var rgba = this.hsvaToRgba(hsva);
                    rgba.denormalize();
                    var output = this.rgbaToHex(rgba, true);
                    break;
                case ColorFormats.HSLA:
                    var hsla = this.hsva2hsla(hsva);
                    hsla.denormalize();
                    var output = hsla.toString();
                    break;
                case ColorFormats.RGBA:
                    var rgba = this.hsvaToRgba(hsva);
                    var output = rgba.toString();
                    break;
                case ColorFormats.CMYK:
                    var rgba = this.hsvaToRgba(hsva);
                    var cmyk = this.rgbaToCmyk(rgba);
                    break;
            }
        }
        return output;
    }
    stringToFormat(color, format) {
        var hsva = this.stringToHsva(color, true);
        return this.toFormat(hsva, format);
    }
    hsva2hsla(hsva) {
        const h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            const l = (v * (2 - s)) / 2;
            return new Hsla(h, (v * s) / (1 - Math.abs(2 * l - 1)), l, a);
        }
    }
    hsla2hsva(hsla) {
        const h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1);
        const l = Math.min(hsla.l, 1), a = Math.min(hsla.a, 1);
        if (l === 0) {
            return new Hsva(h, 0, 0, a);
        }
        else {
            const v = l + (s * (1 - Math.abs(2 * l - 1))) / 2;
            return new Hsva(h, (2 * (v - l)) / v, v, a);
        }
    }
    hsvaToRgba(hsva) {
        let r, g, b;
        const h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                (r = v), (g = t), (b = p);
                break;
            case 1:
                (r = q), (g = v), (b = p);
                break;
            case 2:
                (r = p), (g = v), (b = t);
                break;
            case 3:
                (r = p), (g = q), (b = v);
                break;
            case 4:
                (r = t), (g = p), (b = v);
                break;
            case 5:
                (r = v), (g = p), (b = q);
                break;
            default:
                (r = 0), (g = 0), (b = 0);
        }
        return new Rgba(r, g, b, a);
    }
    cmykToRgb(cmyk) {
        const r = (1 - cmyk.c) * (1 - cmyk.k);
        const g = (1 - cmyk.m) * (1 - cmyk.k);
        const b = (1 - cmyk.y) * (1 - cmyk.k);
        return new Rgba(r, g, b, cmyk.a);
    }
    rgbaToCmyk(rgba) {
        const k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
        if (k === 1) {
            return new Cmyk(0, 0, 0, 1, rgba.a);
        }
        else {
            const c = (1 - rgba.r - k) / (1 - k);
            const m = (1 - rgba.g - k) / (1 - k);
            const y = (1 - rgba.b - k) / (1 - k);
            return new Cmyk(c, m, y, k, rgba.a);
        }
    }
    rgbaToHsva(rgba) {
        let h, s;
        const r = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1);
        const b = Math.min(rgba.b, 1), a = Math.min(rgba.a, 1);
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const v = max, d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                default:
                    h = 0;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    }
    rgbaToHex(rgba, allowHex8) {
        /* tslint:disable:no-bitwise */
        let hex = "#" +
            ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b)
                .toString(16)
                .substr(1);
        if (rgba.a != 1) {
            hex += ((1 << 8) | Math.round(rgba.a * 255)).toString(16).substr(1);
        }
        /* tslint:enable:no-bitwise */
        return hex;
    }
    normalizeCMYK(cmyk) {
        return new Cmyk(cmyk.c / 100, cmyk.m / 100, cmyk.y / 100, cmyk.k / 100, cmyk.a);
    }
    denormalizeCMYK(cmyk) {
        return new Cmyk(Math.floor(cmyk.c * 100), Math.floor(cmyk.m * 100), Math.floor(cmyk.y * 100), Math.floor(cmyk.k * 100), cmyk.a);
    }
    denormalizeRGBA(rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    }
    stringToHsva(colorString = "", allowHex8 = true) {
        let hsva = null;
        colorString = (colorString || "").toLowerCase();
        const stringParsers = [
            {
                re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2], 10) / 255, parseInt(execResult[3], 10) / 255, parseInt(execResult[4], 10) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                },
            },
            {
                re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2], 10) / 360, parseInt(execResult[3], 10) / 100, parseInt(execResult[4], 10) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                },
            },
        ];
        if (allowHex8) {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})?$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, parseInt(execResult[4] || "FF", 16) / 255);
                },
            });
        }
        else {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                },
            });
        }
        stringParsers.push({
            re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
            parse: function (execResult) {
                return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
            },
        });
        for (const key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                const parser = stringParsers[key];
                const match = parser.re.exec(colorString), color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    }
    outputFormat(hsva) {
        return this.hsvaToRgba(hsva).toString();
    }
    getFormatByString(color) {
        if (color) {
            color = color.toLowerCase();
            let regexHex = /(#([\da-f]{3}(?:[\da-f]{3})?(?:[\da-f]{2})?))/;
            let regexRGBA = /(rgba\((\d{1,3},\s?){3}(1|0?\.\d+)\)|rgb\(\d{1,3}(,\s?\d{1,3}){2}\))/;
            let regexHSLA = /(hsla\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|hsl\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/;
            if (regexHex.test(color)) {
                return "hex";
            }
            else if (regexRGBA.test(color)) {
                return "rgba";
            }
            else if (regexHSLA.test(color)) {
                return "hsla";
            }
        }
        return "hex";
    }
}
ConverterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ConverterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConverterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ConverterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ConverterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class SliderPosition {
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
class SliderDimension {
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}

class SliderDirective {
    mouseDown(event) {
        this.start(event);
    }
    touchStart(event) {
        this.start(event);
    }
    constructor(elRef) {
        this.elRef = elRef;
        this.dragEnd = new EventEmitter();
        this.dragStart = new EventEmitter();
        this.newValue = new EventEmitter();
        this.listenerMove = (event) => this.move(event);
        this.listenerStop = () => this.stop();
    }
    move(event) {
        event.preventDefault();
        this.setCursor(event);
    }
    start(event) {
        this.setCursor(event);
        event.stopPropagation();
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        this.dragStart.emit();
    }
    stop() {
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        this.dragEnd.emit();
    }
    getX(event) {
        const position = this.elRef.nativeElement.getBoundingClientRect();
        const pageX = (event.pageX !== undefined) ? event.pageX : event.touches[0].pageX;
        return pageX - position.left - window.pageXOffset;
    }
    getY(event) {
        const position = this.elRef.nativeElement.getBoundingClientRect();
        const pageY = (event.pageY !== undefined) ? event.pageY : event.touches[0].pageY;
        return pageY - position.top - window.pageYOffset;
    }
    setCursor(event) {
        const width = this.elRef.nativeElement.offsetWidth;
        const height = this.elRef.nativeElement.offsetHeight;
        const x = Math.max(0, Math.min(this.getX(event), width));
        const y = Math.max(0, Math.min(this.getY(event), height));
        if (this.rgX !== undefined && this.rgY !== undefined) {
            this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
        }
        else if (this.rgX === undefined && this.rgY !== undefined) {
            this.newValue.emit({ v: y / height, rgY: this.rgY });
        }
        else if (this.rgX !== undefined && this.rgY === undefined) {
            this.newValue.emit({ v: x / width, rgX: this.rgX });
        }
    }
}
SliderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: SliderDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
SliderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.1.2", type: SliderDirective, selector: "[slider]", inputs: { rgX: "rgX", rgY: "rgY", slider: "slider" }, outputs: { dragEnd: "dragEnd", dragStart: "dragStart", newValue: "newValue" }, host: { listeners: { "mousedown": "mouseDown($event)", "touchstart": "touchStart($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: SliderDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[slider]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { rgX: [{
                type: Input
            }], rgY: [{
                type: Input
            }], slider: [{
                type: Input
            }], dragEnd: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], newValue: [{
                type: Output
            }], mouseDown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], touchStart: [{
                type: HostListener,
                args: ['touchstart', ['$event']]
            }] } });

class ColorPickerComponent {
    constructor(service, cdr) {
        this.service = service;
        this.cdr = cdr;
        //IO color
        this.color = new Hsva(0, 1, 1, 1);
        this.controls = "default";
        this.sliderChange = new EventEmitter(false);
        this.onAlphaChange = new EventEmitter(false);
        //Event triggered when any slider change
        // @Output() colorSelectedChange:EventEmitter<Hsva> = new EventEmitter<Hsva>(false);
        this.hsva = new Hsva(0, 1, 1, 1);
        this.selectedColor = "#000000";
        this.fallbackColor = "#000000";
    }
    ngOnInit() {
        if (!this.color) {
            this.color = new Hsva(0, 1, 1, 1);
        }
        this.slider = new SliderPosition(0, 0, 0, 0);
        this.update();
    }
    ngOnDestroy() { }
    ngOnChanges(changes) {
        if (changes.color && this.color) {
            this.update();
        }
    }
    ngAfterViewInit() {
        const hueWidth = this.hueSlider?.nativeElement.offsetWidth || 140;
        const alphaWidth = this.alphaSlider?.nativeElement.offsetWidth || 140;
        this.sliderDimMax = new SliderDimension(hueWidth, 220, 130, alphaWidth);
        this.update();
    }
    onSliderChange(type, event) {
        switch (type) {
            case "saturation-lightness":
                this.hsva.onColorChange(event);
                break;
            case "hue":
                this.hsva.onHueChange(event);
                break;
            case "alpha":
                this.hsva.onAlphaChange(event);
                this.onAlphaChange.emit(event);
                break;
            case "value":
                this.hsva.onValueChange(event);
                break;
        }
        // this.sHue = this.hsva.h;
        this.update();
        this.setColor(this.outputColor);
    }
    setColor(color) {
        this.color = color;
        this.sliderChange.emit(this.color);
    }
    getBackgroundColor(color) {
        return {
            background: "linear-gradient(90deg, rgba(36,0,0,0) 0%, " + color + " 100%)",
        };
    }
    update() {
        this.hsva = this.color;
        if (this.sliderDimMax) {
            let rgba = this.service.hsvaToRgba(this.hsva).denormalize();
            let hue = this.service
                .hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1))
                .denormalize();
            this.hueSliderColor = "rgb(" + hue.r + "," + hue.g + "," + hue.b + ")";
            this.alphaSliderColor =
                "rgb(" + rgba.r + "," + rgba.g + "," + rgba.b + ")";
            this.outputColor = this.hsva;
            this.selectedColor = this.service.hsvaToRgba(this.hsva).toString();
            this.slider = new SliderPosition(
            // (this.sHue || this.hsva.h) * this.sliderDimMax.h - 8,
            this.hsva.h * this.sliderDimMax.h - 5, this.hsva.s * this.sliderDimMax.s - 8, (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 5);
            this.cdr.detectChanges();
        }
    }
}
ColorPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ColorPickerComponent, deps: [{ token: ConverterService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ColorPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: ColorPickerComponent, selector: "color-picker", inputs: { color: "color", controls: "controls" }, outputs: { sliderChange: "sliderChange", onAlphaChange: "onAlphaChange" }, viewQueries: [{ propertyName: "hueSlider", first: true, predicate: ["hueSlider"], descendants: true }, { propertyName: "alphaSlider", first: true, predicate: ["alphaSlider"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div #dialogPopup class=\"color-picker\" (click)=\"$event.stopPropagation()\">\n  <div\n    class=\"saturation-lightness\"\n    *ngIf=\"this.controls != 'only-alpha'\"\n    [slider]\n    [rgX]=\"1\"\n    [rgY]=\"1\"\n    [style.background-color]=\"hueSliderColor\"\n    (newValue)=\"onSliderChange('saturation-lightness', $event)\"\n  >\n    <div class=\"cursor\" [style.top.px]=\"slider?.v\" [style.left.px]=\"slider?.s\">\n      <div></div>\n    </div>\n  </div>\n\n  <div class=\"hue-alpha box\">\n    <div class=\"left\" *ngIf=\"this.controls != 'only-alpha'\">\n      <div class=\"selected-color-background\"></div>\n      <div\n        class=\"selected-color\"\n        [style.background-color]=\"selectedColor\"\n      ></div>\n    </div>\n\n    <div class=\"right\">\n      <div\n        *ngIf=\"this.controls != 'only-alpha'\"\n        #hueSlider\n        class=\"hue\"\n        [slider]\n        [rgX]=\"1\"\n        (newValue)=\"onSliderChange('hue', $event)\"\n      >\n        <div class=\"sliderCursor\" [style.left.px]=\"slider?.h\">\n          <div><div></div></div>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"this.controls != 'no-alpha'\"\n        #alphaSlider\n        class=\"alpha\"\n        [slider]\n        [rgX]=\"1\"\n        (newValue)=\"onSliderChange('alpha', $event)\"\n      >\n        <div\n          class=\"alpha-gradient\"\n          [ngStyle]=\"getBackgroundColor(alphaSliderColor)\"\n        ></div>\n        <div class=\"sliderCursor\" [style.left.px]=\"slider?.a\">\n          <div><div></div></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".color-picker{position:relative;z-index:1000;width:220px;height:auto;cursor:default;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;touch-action:none}.color-picker *{box-sizing:border-box;margin:0;font-size:11px}.color-picker input{width:0;height:26px;min-width:0;font-size:13px;text-align:center;color:#000}.color-picker input:invalid,.color-picker input:-moz-ui-invalid,.color-picker input:-moz-submit-invalid{box-shadow:none}.color-picker input::-webkit-inner-spin-button,.color-picker input::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}.color-picker .sliderCursor{width:10px;border-radius:5px;position:absolute;margin-top:-3px;border:1px solid black}.color-picker .sliderCursor>div{border:2px solid white;border-radius:5px}.color-picker .sliderCursor>div>div{border-radius:5px;border:1px solid black;height:24px}.color-picker .cursor{position:absolute;width:21px;border:3px solid black;border-radius:100%;margin:-2px 0 0 -2px}.color-picker .cursor>div{height:15px;border:3px solid white;border-radius:100%}.color-picker .box{display:flex;padding:4px 8px}.color-picker .left{position:relative;padding:16px 8px}.color-picker .right{flex:1 1 auto;display:flex;flex-direction:column;gap:10px;padding:12px 8px}.color-picker .hue-alpha{display:flex;align-items:center;margin-bottom:3px}.color-picker .hue{direction:ltr;width:100%;height:24px;border:none;border-radius:5px;position:relative;cursor:pointer;background-size:100% 100%;background:linear-gradient(to right,red 0%,#ff0 17%,lime 33%,cyan 50%,blue 66%,#f0f 83%,red 100%)}.color-picker .alpha{direction:ltr;position:relative;width:100%;height:24px;border:none;border-radius:5px;cursor:pointer;background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.color-picker .alpha-gradient{width:100%;height:100%;border-radius:5px;position:absolute}.color-picker .selected-color{position:absolute;top:16px;left:8px;width:40px;height:40px;box-shadow:0 1px 1px 1px #00000026;border-radius:50%}.color-picker .selected-color-background{width:40px;height:40px;border-radius:50%;background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.color-picker .saturation-lightness{direction:ltr;cursor:crosshair;width:100%;position:relative;height:130px;border:none;touch-action:manipulation;background-image:linear-gradient(to top,#000 0%,transparent 100%),linear-gradient(to right,#fff 0%,transparent 100%)}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: SliderDirective, selector: "[slider]", inputs: ["rgX", "rgY", "slider"], outputs: ["dragEnd", "dragStart", "newValue"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ColorPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: "color-picker", encapsulation: ViewEncapsulation.None, template: "<div #dialogPopup class=\"color-picker\" (click)=\"$event.stopPropagation()\">\n  <div\n    class=\"saturation-lightness\"\n    *ngIf=\"this.controls != 'only-alpha'\"\n    [slider]\n    [rgX]=\"1\"\n    [rgY]=\"1\"\n    [style.background-color]=\"hueSliderColor\"\n    (newValue)=\"onSliderChange('saturation-lightness', $event)\"\n  >\n    <div class=\"cursor\" [style.top.px]=\"slider?.v\" [style.left.px]=\"slider?.s\">\n      <div></div>\n    </div>\n  </div>\n\n  <div class=\"hue-alpha box\">\n    <div class=\"left\" *ngIf=\"this.controls != 'only-alpha'\">\n      <div class=\"selected-color-background\"></div>\n      <div\n        class=\"selected-color\"\n        [style.background-color]=\"selectedColor\"\n      ></div>\n    </div>\n\n    <div class=\"right\">\n      <div\n        *ngIf=\"this.controls != 'only-alpha'\"\n        #hueSlider\n        class=\"hue\"\n        [slider]\n        [rgX]=\"1\"\n        (newValue)=\"onSliderChange('hue', $event)\"\n      >\n        <div class=\"sliderCursor\" [style.left.px]=\"slider?.h\">\n          <div><div></div></div>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"this.controls != 'no-alpha'\"\n        #alphaSlider\n        class=\"alpha\"\n        [slider]\n        [rgX]=\"1\"\n        (newValue)=\"onSliderChange('alpha', $event)\"\n      >\n        <div\n          class=\"alpha-gradient\"\n          [ngStyle]=\"getBackgroundColor(alphaSliderColor)\"\n        ></div>\n        <div class=\"sliderCursor\" [style.left.px]=\"slider?.a\">\n          <div><div></div></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".color-picker{position:relative;z-index:1000;width:220px;height:auto;cursor:default;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;touch-action:none}.color-picker *{box-sizing:border-box;margin:0;font-size:11px}.color-picker input{width:0;height:26px;min-width:0;font-size:13px;text-align:center;color:#000}.color-picker input:invalid,.color-picker input:-moz-ui-invalid,.color-picker input:-moz-submit-invalid{box-shadow:none}.color-picker input::-webkit-inner-spin-button,.color-picker input::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}.color-picker .sliderCursor{width:10px;border-radius:5px;position:absolute;margin-top:-3px;border:1px solid black}.color-picker .sliderCursor>div{border:2px solid white;border-radius:5px}.color-picker .sliderCursor>div>div{border-radius:5px;border:1px solid black;height:24px}.color-picker .cursor{position:absolute;width:21px;border:3px solid black;border-radius:100%;margin:-2px 0 0 -2px}.color-picker .cursor>div{height:15px;border:3px solid white;border-radius:100%}.color-picker .box{display:flex;padding:4px 8px}.color-picker .left{position:relative;padding:16px 8px}.color-picker .right{flex:1 1 auto;display:flex;flex-direction:column;gap:10px;padding:12px 8px}.color-picker .hue-alpha{display:flex;align-items:center;margin-bottom:3px}.color-picker .hue{direction:ltr;width:100%;height:24px;border:none;border-radius:5px;position:relative;cursor:pointer;background-size:100% 100%;background:linear-gradient(to right,red 0%,#ff0 17%,lime 33%,cyan 50%,blue 66%,#f0f 83%,red 100%)}.color-picker .alpha{direction:ltr;position:relative;width:100%;height:24px;border:none;border-radius:5px;cursor:pointer;background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.color-picker .alpha-gradient{width:100%;height:100%;border-radius:5px;position:absolute}.color-picker .selected-color{position:absolute;top:16px;left:8px;width:40px;height:40px;box-shadow:0 1px 1px 1px #00000026;border-radius:50%}.color-picker .selected-color-background{width:40px;height:40px;border-radius:50%;background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.color-picker .saturation-lightness{direction:ltr;cursor:crosshair;width:100%;position:relative;height:130px;border:none;touch-action:manipulation;background-image:linear-gradient(to top,#000 0%,transparent 100%),linear-gradient(to right,#fff 0%,transparent 100%)}\n"] }]
        }], ctorParameters: function () { return [{ type: ConverterService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { color: [{
                type: Input
            }], controls: [{
                type: Input
            }], sliderChange: [{
                type: Output
            }], onAlphaChange: [{
                type: Output
            }], hueSlider: [{
                type: ViewChild,
                args: ["hueSlider", { static: false }]
            }], alphaSlider: [{
                type: ViewChild,
                args: ["alphaSlider", { static: false }]
            }] } });

class PanelComponent {
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
PanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelComponent, deps: [{ token: ConverterService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: PanelComponent, selector: "ngx-colors-panel", host: { listeners: { "document:mousedown": "click($event)", "document:scroll": "onScroll()", "window:resize": "onResize()" }, properties: { "style.top.px": "this.top", "style.left.px": "this.left" } }, viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["dialog"], descendants: true }], ngImport: i0, template: "<div class=\"opened\" [style]=\"positionString\" #dialog>\n  <ng-container *ngIf=\"menu == 1\">\n    <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n      <ng-container *ngFor=\"let color of palette; let i = index\">\n        <div class=\"circle wrapper color\">\n          <div\n            (click)=\"onColorClick(color)\"\n            class=\"circle color circle-border\"\n            [class.colornull]=\"!color\"\n            [ngStyle]=\"getBackgroundColor(color)\"\n          >\n            <div *ngIf=\"i == this.indexSeleccionado\" class=\"selected\"></div>\n          </div>\n        </div>\n      </ng-container>\n      <div\n        style=\"background: rgb(245 245 245); position: relative\"\n        (click)=\"addColor()\"\n        *ngIf=\"!hideColorPicker && this.colorPickerControls != 'only-alpha'\"\n        class=\"circle button\"\n      >\n        <div\n          *ngIf=\"!this.indexSeleccionado\"\n          style=\"\n            position: absolute;\n            height: 7px;\n            width: 7px;\n            border: 1px solid rgba(0, 0, 0, 0.03);\n            border-radius: 100%;\n            top: 0;\n            right: 0;\n          \"\n          [ngStyle]=\"getBackgroundColor(color)\"\n        ></div>\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          height=\"24px\"\n          viewBox=\"0 0 24 24\"\n          width=\"24px\"\n          fill=\"#222222\"\n        >\n          <path d=\"M24 24H0V0h24v24z\" fill=\"none\" opacity=\".87\" />\n          <path d=\"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z\" />\n        </svg>\n        <!-- <div class=\"add\">\n          <icons icon=\"add\"></icons>\n        </div> -->\n      </div>\n      <color-picker\n        *ngIf=\"!hideColorPicker && this.colorPickerControls == 'only-alpha'\"\n        [controls]=\"colorPickerControls\"\n        [color]=\"hsva\"\n        (colorChange)=\"onChangeColorPicker($event)\"\n        (onAlphaChange)=\"onAlphaChange($event)\"\n      ></color-picker>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"menu == 2\">\n    <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n      <div class=\"circle wrapper\">\n        <div (click)=\"onClickBack()\" class=\"add\">\n          <svg\n            xmlns=\"http://www.w3.org/2000/svg\"\n            width=\"24\"\n            height=\"24\"\n            viewBox=\"0 0 24 24\"\n          >\n            <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n            <path\n              d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n            />\n          </svg>\n        </div>\n      </div>\n\n      <ng-container *ngFor=\"let variant of variants\">\n        <div class=\"circle wrapper color\">\n          <div\n            [class.colornull]=\"!variant\"\n            (click)=\"changeColor(variant)\"\n            class=\"circle circle-border\"\n            [ngStyle]=\"{ background: variant }\"\n          >\n            <div *ngIf=\"isSelected(variant)\" class=\"selected\"></div>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"menu == 3\">\n    <div class=\"nav-wrapper\">\n      <div\n        (click)=\"onClickBack()\"\n        class=\"round-button button\"\n        style=\"float: left\"\n      >\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          width=\"24\"\n          height=\"24\"\n          viewBox=\"0 0 24 24\"\n        >\n          <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n          <path\n            d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n          />\n        </svg>\n      </div>\n      <button (click)=\"emitClose('cancel')\" style=\"float: right\">\n        {{ cancelLabel }}\n      </button>\n      <button (click)=\"emitClose('accept')\" style=\"float: right\">\n        {{ acceptLabel }}\n      </button>\n    </div>\n    <div class=\"color-picker-wrapper\">\n      <!-- <span [(colorPicker)]=\"color\"></span> -->\n      <color-picker\n        [controls]=\"colorPickerControls\"\n        [color]=\"hsva\"\n        (sliderChange)=\"onChangeColorPicker($event)\"\n      ></color-picker>\n    </div>\n  </ng-container>\n  <div class=\"manual-input-wrapper\" *ngIf=\"!hideTextInput\">\n    <p (click)=\"nextFormat()\">{{ colorFormats[format] }}</p>\n    <div class=\"g-input\">\n      <input\n        placeholder=\"#FFFFFF\"\n        type=\"text\"\n        [value]=\"color\"\n        [style.font-size.px]=\"color && color.length > 23 ? 9 : 10\"\n        [style.letter-spacing.px]=\"color && color.length > 16 ? 0 : 1.5\"\n        (keyup)=\"changeColorManual(paintInput.value)\"\n        (keydown.enter)=\"emitClose('accept')\"\n        #paintInput\n      />\n    </div>\n  </div>\n</div>\n", styles: [":host{position:fixed;z-index:2001}.hidden{display:none}.button{display:flex;align-items:center;justify-content:center}.top{transform:translateY(-100%)}.opened{box-sizing:border-box;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#fff;width:250px;border-radius:5px;position:absolute}.opened button{border:none;font-family:inherit;font-size:12px;background-color:unset;-webkit-user-select:none;user-select:none;padding:10px;letter-spacing:1px;color:#222;border-radius:3px;line-height:20px}.opened button:hover,.opened .button:hover{background-color:#0000000d;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1);transition-property:opacity,background-color;transition-duration:.2s,.2s;transition-timing-function:cubic-bezier(.35,0,.25,1),cubic-bezier(.35,0,.25,1);transition-delay:0s,0s}.opened button:focus{outline:none}.opened .colors{display:flex;flex-wrap:wrap;align-items:center;margin:15px}.opened .colors .circle{height:34px;width:34px;box-sizing:border-box;border-radius:100%;cursor:pointer}.opened .colors .circle .add{font-size:20px;line-height:45px;text-align:center}.opened .colors .circle .selected{border:2px solid white;border-radius:100%;height:28px;width:28px;box-sizing:border-box;margin:2px}.opened .colors .circle.colornull{background:linear-gradient(135deg,rgba(236,236,236,.7) 0%,rgba(236,236,236,.7) 45%,#de0f00 50%,rgba(236,236,236,.7) 55%,rgba(236,236,236,.7) 100%)}.opened .colors .circle.wrapper{margin:0 5px 5px;flex:34px 0 0}.opened .colors .circle.button{margin:0 5px 5px}.opened .colors .circle.wrapper.color{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.opened .colors .circle-border{border:1px solid rgba(0,0,0,.03)}.opened .color-picker-wrapper{margin:5px 15px}.opened .nav-wrapper{overflow:hidden;margin:5px}.opened .nav-wrapper .round-button{padding:5px 0;width:40px;height:40px;box-sizing:border-box;border-radius:100%;text-align:center;line-height:45px}.opened .manual-input-wrapper{display:flex;margin:15px;font-family:sans-serif}.opened .manual-input-wrapper p{margin:0;text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;line-height:48px;width:145px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.opened .manual-input-wrapper .g-input{border:1px solid #e8ebed;height:45px;border-radius:5px;width:100%}.opened .manual-input-wrapper .g-input input{font-size:9px;border:none;width:100%;text-transform:uppercase;outline:none;text-align:center;letter-spacing:1px;color:#595b65;height:100%;border-radius:5px;margin:0;padding:0}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: ColorPickerComponent, selector: "color-picker", inputs: ["color", "controls"], outputs: ["sliderChange", "onAlphaChange"] }], animations: [
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
        }], ctorParameters: function () { return [{ type: ConverterService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { click: [{
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

const OVERLAY_STYLES = {
    position: 'fixed',
    height: '100%',
    width: '100%',
    'z-index': 2000,
    top: 0,
    left: 0,
};

class PanelFactoryService {
    constructor(resolver, applicationRef, injector) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
    }
    createPanel(attachTo, overlayClassName) {
        if (this.componentRef != undefined) {
            this.removePanel();
        }
        const factory = this.resolver.resolveComponentFactory(PanelComponent);
        this.componentRef = factory.create(this.injector);
        this.applicationRef.attachView(this.componentRef.hostView);
        const domElem = this.componentRef.hostView
            .rootNodes[0];
        this.overlay = document.createElement("div");
        this.overlay.id = "ngx-colors-overlay";
        this.overlay.classList.add("ngx-colors-overlay");
        this.overlay.classList.add(overlayClassName);
        Object.keys(OVERLAY_STYLES).forEach((attr) => {
            this.overlay.style[attr] = OVERLAY_STYLES[attr];
        });
        if (attachTo) {
            document.getElementById(attachTo).appendChild(this.overlay);
        }
        else {
            document.body.appendChild(this.overlay);
        }
        this.overlay.appendChild(domElem);
        return this.componentRef;
    }
    removePanel() {
        this.applicationRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.overlay.remove();
    }
}
PanelFactoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelFactoryService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
PanelFactoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelFactoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelFactoryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }]; } });

class NgxColorsTriggerDirective {
    onClick() {
        this.openPanel();
    }
    constructor(triggerRef, panelFactory) {
        this.triggerRef = triggerRef;
        this.panelFactory = panelFactory;
        //Main input/output of the color picker
        // @Input() color = '#000000';
        // @Output() colorChange:EventEmitter<string> = new EventEmitter<string>();
        this.color = "";
        //This defines the type of animation for the palatte.(slide-in | popup)
        this.colorsAnimation = "slide-in";
        this.position = "bottom";
        this.attachTo = undefined;
        this.overlayClassName = undefined;
        this.colorPickerControls = "default";
        this.acceptLabel = "ACCEPT";
        this.cancelLabel = "CANCEL";
        // This event is trigger every time the selected color change
        this.change = new EventEmitter();
        // This event is trigger every time the user change the color using the panel
        this.input = new EventEmitter();
        // This event is trigger every time the user change the color using the panel
        this.slider = new EventEmitter();
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.isDisabled = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    openPanel() {
        if (!this.isDisabled) {
            this.panelRef = this.panelFactory.createPanel(this.attachTo, this.overlayClassName);
            this.panelRef.instance.iniciate(this, this.triggerRef, this.color, this.palette, this.colorsAnimation, this.format, this.hideTextInput, this.hideColorPicker, this.acceptLabel, this.cancelLabel, this.colorPickerControls, this.position);
        }
        this.open.emit(this.color);
    }
    closePanel() {
        this.panelFactory.removePanel();
        this.onTouchedCallback();
        this.close.emit(this.color);
    }
    onChange() {
        this.onChangeCallback(this.color);
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
        this.triggerRef.nativeElement.style.opacity = isDisabled ? 0.5 : 1;
    }
    setColor(color) {
        this.writeValue(color);
        this.input.emit(color);
    }
    sliderChange(color) {
        this.slider.emit(color);
    }
    get value() {
        return this.color;
    }
    set value(value) {
        this.setColor(value);
        this.onChangeCallback(value);
    }
    writeValue(value) {
        if (value !== this.color) {
            this.color = value;
            this.onChange();
            this.change.emit(value);
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
NgxColorsTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsTriggerDirective, deps: [{ token: i0.ElementRef }, { token: PanelFactoryService }], target: i0.ɵɵFactoryTarget.Directive });
NgxColorsTriggerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.1.2", type: NgxColorsTriggerDirective, selector: "[ngx-colors-trigger]", inputs: { colorsAnimation: "colorsAnimation", palette: "palette", format: "format", position: "position", hideTextInput: "hideTextInput", hideColorPicker: "hideColorPicker", attachTo: "attachTo", overlayClassName: "overlayClassName", colorPickerControls: "colorPickerControls", acceptLabel: "acceptLabel", cancelLabel: "cancelLabel" }, outputs: { change: "change", input: "input", slider: "slider", close: "close", open: "open" }, host: { listeners: { "click": "onClick()" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxColorsTriggerDirective),
            multi: true,
        },
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[ngx-colors-trigger]",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxColorsTriggerDirective),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: PanelFactoryService }]; }, propDecorators: { colorsAnimation: [{
                type: Input
            }], palette: [{
                type: Input
            }], format: [{
                type: Input
            }], position: [{
                type: Input
            }], hideTextInput: [{
                type: Input
            }], hideColorPicker: [{
                type: Input
            }], attachTo: [{
                type: Input
            }], overlayClassName: [{
                type: Input
            }], colorPickerControls: [{
                type: Input
            }], acceptLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], change: [{
                type: Output
            }], input: [{
                type: Output
            }], slider: [{
                type: Output
            }], close: [{
                type: Output
            }], open: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ["click"]
            }] } });

class NgxColorsComponent {
    constructor(cdRef, triggerDirective) {
        this.cdRef = cdRef;
        this.triggerDirective = triggerDirective;
        this.triggerDirectiveColorChangeSubscription = null;
        //IO color
        this.color = this.triggerDirective.color;
    }
    ngOnInit() {
        this.triggerDirectiveColorChangeSubscription =
            this.triggerDirective.change.subscribe((color) => {
                this.color = color;
                this.cdRef.markForCheck();
            });
    }
    ngOnDestroy() {
        if (this.triggerDirectiveColorChangeSubscription) {
            this.triggerDirectiveColorChangeSubscription.unsubscribe();
        }
    }
}
NgxColorsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: NgxColorsTriggerDirective, host: true }], target: i0.ɵɵFactoryTarget.Component });
NgxColorsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: NgxColorsComponent, selector: "ngx-colors", ngImport: i0, template: "<div class=\"app-color-picker\">\n  <div class=\"preview\">\n    <div class=\"preview-background\">\n      <div\n        class=\"circle\"\n        [class.colornull]=\"!color\"\n        [ngStyle]=\"{ background: color }\"\n      ></div>\n    </div>\n  </div>\n</div>\n", styles: [":host .app-color-picker{line-height:1px;font-family:sans-serif}:host .app-color-picker .preview{margin:2px;display:inline-block;box-sizing:border-box;border-radius:100%;background:white;cursor:pointer;padding:3px;box-shadow:0 1px 1px #0003,0 1px 1px 1px #00000024,0 1px 1px 1px #0000001f}:host .app-color-picker .preview .preview-background{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px;border-radius:100%}:host .app-color-picker .preview .circle{height:20px;width:20px;box-sizing:border-box;border-radius:100%;cursor:pointer}:host .app-color-picker .preview .circle.colornull{background:linear-gradient(135deg,rgba(236,236,236,.7) 0%,rgba(236,236,236,.7) 45%,#de0f00 50%,rgba(236,236,236,.7) 55%,rgba(236,236,236,.7) 100%)}:host .app-color-picker .preview .noselected{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}\n"], dependencies: [{ kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-colors', template: "<div class=\"app-color-picker\">\n  <div class=\"preview\">\n    <div class=\"preview-background\">\n      <div\n        class=\"circle\"\n        [class.colornull]=\"!color\"\n        [ngStyle]=\"{ background: color }\"\n      ></div>\n    </div>\n  </div>\n</div>\n", styles: [":host .app-color-picker{line-height:1px;font-family:sans-serif}:host .app-color-picker .preview{margin:2px;display:inline-block;box-sizing:border-box;border-radius:100%;background:white;cursor:pointer;padding:3px;box-shadow:0 1px 1px #0003,0 1px 1px 1px #00000024,0 1px 1px 1px #0000001f}:host .app-color-picker .preview .preview-background{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px;border-radius:100%}:host .app-color-picker .preview .circle{height:20px;width:20px;box-sizing:border-box;border-radius:100%;cursor:pointer}:host .app-color-picker .preview .circle.colornull{background:linear-gradient(135deg,rgba(236,236,236,.7) 0%,rgba(236,236,236,.7) 45%,#de0f00 50%,rgba(236,236,236,.7) 55%,rgba(236,236,236,.7) 100%)}:host .app-color-picker .preview .noselected{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: NgxColorsTriggerDirective, decorators: [{
                    type: Host
                }] }]; } });

class NgxColorsModule {
}
NgxColorsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxColorsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsModule, declarations: [NgxColorsComponent,
        ColorPickerComponent,
        SliderDirective,
        PanelComponent,
        NgxColorsTriggerDirective], imports: [CommonModule], exports: [NgxColorsComponent, NgxColorsTriggerDirective] });
NgxColorsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsModule, providers: [ConverterService, PanelFactoryService], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgxColorsComponent,
                        ColorPickerComponent,
                        SliderDirective,
                        PanelComponent,
                        NgxColorsTriggerDirective,
                    ],
                    imports: [CommonModule],
                    providers: [ConverterService, PanelFactoryService],
                    exports: [NgxColorsComponent, NgxColorsTriggerDirective],
                }]
        }] });

function validColorValidator() {
    return (control) => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const rgbTest = /^\s*rgba?\(\s*(1?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*(1?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*(1?\d{1,2}|2[0-4]\d|25[0-5])\s*(,\s*(0\.\d{1,2}|1))?\s*\)\s*$/i;
        const hslTest = /^\s*hsla?\(\s*([0-2]?\d{1,2}|3[0-5]\d|360)\s*,\s*(0|[1-9]{1,2}|100)\%\s*,\s*(0|[1-9]{1,2}|100)\%\s*(,\s*(0\.\d{1,2}|1))?\s*\)\s*$/i;
        const hexTest = /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const colorValid = rgbTest.test(value) || hslTest.test(value) || hexTest.test(value);
        return !colorValid ? { invalidColor: true } : null;
    };
}

/*
 * Public API Surface of ngx-colors
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxColorsColor, NgxColorsComponent, NgxColorsModule, NgxColorsTriggerDirective, validColorValidator };
//# sourceMappingURL=ngx-colors.mjs.map
