import { ComponentFactoryResolver, Injector, ComponentFactory, ApplicationRef, ComponentRef } from "@angular/core";
import { PanelComponent } from "../components/panel/panel.component";
import * as i0 from "@angular/core";
export declare class PanelFactoryService {
    private resolver;
    private applicationRef;
    private injector;
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector);
    componentRef: ComponentRef<PanelComponent>;
    _factory: ComponentFactory<PanelComponent>;
    overlay: any;
    createPanel(attachTo: string | undefined, overlayClassName: string | undefined): ComponentRef<PanelComponent>;
    removePanel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PanelFactoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PanelFactoryService>;
}
