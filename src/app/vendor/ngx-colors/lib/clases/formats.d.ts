import { EventEmitter } from '@angular/core';
export declare class Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a: number);
    denormalize(): Rgba;
    toString(): string;
}
export declare class Hsva {
    h: number;
    s: number;
    v: number;
    a: number;
    onChange: EventEmitter<Hsva>;
    constructor(h: number, s: number, v: number, a: number);
    onColorChange(value: {
        s: number;
        v: number;
        rgX: number;
        rgY: number;
    }): void;
    onHueChange(value: {
        v: number;
        rgX: number;
    }): void;
    onValueChange(value: {
        v: number;
        rgX: number;
    }): void;
    onAlphaChange(value: {
        v: number;
        rgX: number;
    }): void;
}
export declare class Hsla {
    h: number;
    s: number;
    l: number;
    a: number;
    constructor(h: number, s: number, l: number, a: number);
    denormalize(): Hsla;
    toString(): string;
}
export declare class Cmyk {
    c: number;
    m: number;
    y: number;
    k: number;
    a: number;
    constructor(c: number, m: number, y: number, k: number, a?: number);
}
