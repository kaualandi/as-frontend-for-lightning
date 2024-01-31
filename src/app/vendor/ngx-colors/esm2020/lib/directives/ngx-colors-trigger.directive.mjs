import { EventEmitter, Input, Output, Directive, HostListener, forwardRef, } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "../services/panel-factory.service";
export class NgxColorsTriggerDirective {
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
NgxColorsTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsTriggerDirective, deps: [{ token: i0.ElementRef }, { token: i1.PanelFactoryService }], target: i0.ɵɵFactoryTarget.Directive });
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.PanelFactoryService }]; }, propDecorators: { colorsAnimation: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbG9ycy10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jb2xvcnMvc3JjL2xpYi9kaXJlY3RpdmVzL25neC1jb2xvcnMtdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFHVCxZQUFZLEVBQ1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBYXpFLE1BQU0sT0FBTyx5QkFBeUI7SUFnQ2IsT0FBTztRQUM1QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNELFlBQ1UsVUFBc0IsRUFDdEIsWUFBaUM7UUFEakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFwQzNDLHVDQUF1QztRQUN2Qyw4QkFBOEI7UUFDOUIsMkVBQTJFO1FBRTNFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCx1RUFBdUU7UUFDOUQsb0JBQWUsR0FBeUIsVUFBVSxDQUFDO1FBTW5ELGFBQVEsR0FBcUIsUUFBUSxDQUFDO1FBR3RDLGFBQVEsR0FBdUIsU0FBUyxDQUFDO1FBQ3pDLHFCQUFnQixHQUF1QixTQUFTLENBQUM7UUFDakQsd0JBQW1CLEdBQzFCLFNBQVMsQ0FBQztRQUNILGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQ3hDLDZEQUE2RDtRQUNuRCxXQUFNLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDcEUsNkVBQTZFO1FBQ25FLFVBQUssR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuRSw2RUFBNkU7UUFDbkUsV0FBTSxHQUF5QixJQUFJLFlBQVks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LElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7c0hBckhVLHlCQUF5QjswR0FBekIseUJBQXlCLDZnQkFSekI7UUFDVDtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztZQUN4RCxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0Y7MkZBRVUseUJBQXlCO2tCQVZyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSwwQkFBMEIsQ0FBQzs0QkFDeEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7bUlBU1UsZUFBZTtzQkFBdkIsS0FBSztnQkFHRyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUVHLEtBQUs7c0JBQWQsTUFBTTtnQkFFRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFFZ0IsT0FBTztzQkFBN0IsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIENvbXBvbmVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBmb3J3YXJkUmVmLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFuZWxGYWN0b3J5U2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9wYW5lbC1mYWN0b3J5LnNlcnZpY2VcIjtcbmltcG9ydCB7IFBhbmVsQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5neENvbG9yc0NvbG9yIH0gZnJvbSBcIi4uL2NsYXNlcy9jb2xvclwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IFwiW25neC1jb2xvcnMtdHJpZ2dlcl1cIixcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hDb2xvcnNUcmlnZ2VyRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neENvbG9yc1RyaWdnZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8vTWFpbiBpbnB1dC9vdXRwdXQgb2YgdGhlIGNvbG9yIHBpY2tlclxuICAvLyBASW5wdXQoKSBjb2xvciA9ICcjMDAwMDAwJztcbiAgLy8gQE91dHB1dCgpIGNvbG9yQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29sb3IgPSBcIlwiO1xuXG4gIC8vVGhpcyBkZWZpbmVzIHRoZSB0eXBlIG9mIGFuaW1hdGlvbiBmb3IgdGhlIHBhbGF0dGUuKHNsaWRlLWluIHwgcG9wdXApXG4gIEBJbnB1dCgpIGNvbG9yc0FuaW1hdGlvbjogXCJzbGlkZS1pblwiIHwgXCJwb3B1cFwiID0gXCJzbGlkZS1pblwiO1xuXG4gIC8vVGhpcyBpcyB1c2VkIHRvIHNldCBhIGN1c3RvbSBwYWxldHRlIG9mIGNvbG9ycyBpbiB0aGUgcGFuZWw7XG4gIEBJbnB1dCgpIHBhbGV0dGU6IEFycmF5PHN0cmluZz4gfCBBcnJheTxOZ3hDb2xvcnNDb2xvcj47XG5cbiAgQElucHV0KCkgZm9ybWF0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBcInRvcFwiIHwgXCJib3R0b21cIiA9IFwiYm90dG9tXCI7XG4gIEBJbnB1dCgpIGhpZGVUZXh0SW5wdXQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhpZGVDb2xvclBpY2tlcjogYm9vbGVhbjtcbiAgQElucHV0KCkgYXR0YWNoVG86IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgb3ZlcmxheUNsYXNzTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBjb2xvclBpY2tlckNvbnRyb2xzOiBcImRlZmF1bHRcIiB8IFwib25seS1hbHBoYVwiIHwgXCJuby1hbHBoYVwiID1cbiAgICBcImRlZmF1bHRcIjtcbiAgQElucHV0KCkgYWNjZXB0TGFiZWw6IHN0cmluZyA9IFwiQUNDRVBUXCI7XG4gIEBJbnB1dCgpIGNhbmNlbExhYmVsOiBzdHJpbmcgPSBcIkNBTkNFTFwiO1xuICAvLyBUaGlzIGV2ZW50IGlzIHRyaWdnZXIgZXZlcnkgdGltZSB0aGUgc2VsZWN0ZWQgY29sb3IgY2hhbmdlXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIC8vIFRoaXMgZXZlbnQgaXMgdHJpZ2dlciBldmVyeSB0aW1lIHRoZSB1c2VyIGNoYW5nZSB0aGUgY29sb3IgdXNpbmcgdGhlIHBhbmVsXG4gIEBPdXRwdXQoKSBpbnB1dDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgLy8gVGhpcyBldmVudCBpcyB0cmlnZ2VyIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgY2hhbmdlIHRoZSBjb2xvciB1c2luZyB0aGUgcGFuZWxcbiAgQE91dHB1dCgpIHNsaWRlcjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgb3BlbjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIikgb25DbGljaygpIHtcbiAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICB9XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJpZ2dlclJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBhbmVsRmFjdG9yeTogUGFuZWxGYWN0b3J5U2VydmljZVxuICApIHt9XG5cbiAgcGFuZWxSZWY6IENvbXBvbmVudFJlZjxQYW5lbENvbXBvbmVudD47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgcHVibGljIG9wZW5QYW5lbCgpIHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5wYW5lbFJlZiA9IHRoaXMucGFuZWxGYWN0b3J5LmNyZWF0ZVBhbmVsKFxuICAgICAgICB0aGlzLmF0dGFjaFRvLFxuICAgICAgICB0aGlzLm92ZXJsYXlDbGFzc05hbWVcbiAgICAgICk7XG4gICAgICB0aGlzLnBhbmVsUmVmLmluc3RhbmNlLmluaWNpYXRlKFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLnRyaWdnZXJSZWYsXG4gICAgICAgIHRoaXMuY29sb3IsXG4gICAgICAgIHRoaXMucGFsZXR0ZSxcbiAgICAgICAgdGhpcy5jb2xvcnNBbmltYXRpb24sXG4gICAgICAgIHRoaXMuZm9ybWF0LFxuICAgICAgICB0aGlzLmhpZGVUZXh0SW5wdXQsXG4gICAgICAgIHRoaXMuaGlkZUNvbG9yUGlja2VyLFxuICAgICAgICB0aGlzLmFjY2VwdExhYmVsLFxuICAgICAgICB0aGlzLmNhbmNlbExhYmVsLFxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyQ29udHJvbHMsXG4gICAgICAgIHRoaXMucG9zaXRpb25cbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMub3Blbi5lbWl0KHRoaXMuY29sb3IpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlUGFuZWwoKSB7XG4gICAgdGhpcy5wYW5lbEZhY3RvcnkucmVtb3ZlUGFuZWwoKTtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5jbG9zZS5lbWl0KHRoaXMuY29sb3IpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKCkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmNvbG9yKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzRGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMudHJpZ2dlclJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpc0Rpc2FibGVkID8gMC41IDogMTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDb2xvcihjb2xvcikge1xuICAgIHRoaXMud3JpdGVWYWx1ZShjb2xvcik7XG4gICAgdGhpcy5pbnB1dC5lbWl0KGNvbG9yKTtcbiAgfVxuXG4gIHB1YmxpYyBzbGlkZXJDaGFuZ2UoY29sb3IpIHtcbiAgICB0aGlzLnNsaWRlci5lbWl0KGNvbG9yKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldENvbG9yKHZhbHVlKTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgdGhpcy5jb2xvciA9IHZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG59XG4iXX0=