import { Cmyk, Rgba, Hsla, Hsva } from "../clases/formats";
import { ColorFormats } from "../enums/formats";
import * as i0 from "@angular/core";
export declare class ConverterService {
    constructor();
    toFormat(hsva: Hsva, format: ColorFormats): string;
    stringToFormat(color: string, format: ColorFormats): string;
    hsva2hsla(hsva: Hsva): Hsla;
    hsla2hsva(hsla: Hsla): Hsva;
    hsvaToRgba(hsva: Hsva): Rgba;
    cmykToRgb(cmyk: Cmyk): Rgba;
    rgbaToCmyk(rgba: Rgba): Cmyk;
    rgbaToHsva(rgba: Rgba): Hsva;
    rgbaToHex(rgba: Rgba, allowHex8?: boolean): string;
    normalizeCMYK(cmyk: Cmyk): Cmyk;
    denormalizeCMYK(cmyk: Cmyk): Cmyk;
    denormalizeRGBA(rgba: Rgba): Rgba;
    stringToHsva(colorString?: string, allowHex8?: boolean): Hsva | null;
    outputFormat(hsva: Hsva): string;
    getFormatByString(color: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConverterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConverterService>;
}
