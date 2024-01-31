import { Injectable, } from "@angular/core";
import { PanelComponent } from "../components/panel/panel.component";
import { OVERLAY_STYLES } from "./overlay-styles";
import * as i0 from "@angular/core";
export class PanelFactoryService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtZmFjdG9yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL3NlcnZpY2VzL3BhbmVsLWZhY3Rvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxHQVVYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBR2xELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDVSxRQUFrQyxFQUNsQyxjQUE4QixFQUM5QixRQUFrQjtRQUZsQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6QixDQUFDO0lBTUosV0FBVyxDQUNULFFBQTRCLEVBQzVCLGdCQUFvQztRQUVwQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtRQUNELE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sT0FBTyxHQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBaUM7YUFDakUsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUUvQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLFFBQVEsRUFBRTtZQUNaLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3RDthQUFNO1lBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0hBL0NVLG1CQUFtQjtvSEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEluamVjdG9yLFxuICBJbmplY3QsXG4gIFRlbXBsYXRlUmVmLFxuICBUeXBlLFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBBcHBsaWNhdGlvblJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBDb21wb25lbnRSZWYsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IFBhbmVsQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPVkVSTEFZX1NUWUxFUyB9IGZyb20gXCIuL292ZXJsYXktc3R5bGVzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYW5lbEZhY3RvcnlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxQYW5lbENvbXBvbmVudD47XG4gIF9mYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PFBhbmVsQ29tcG9uZW50PjtcbiAgb3ZlcmxheTtcblxuICBjcmVhdGVQYW5lbChcbiAgICBhdHRhY2hUbzogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIG92ZXJsYXlDbGFzc05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICApOiBDb21wb25lbnRSZWY8UGFuZWxDb21wb25lbnQ+IHtcbiAgICBpZiAodGhpcy5jb21wb25lbnRSZWYgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnJlbW92ZVBhbmVsKCk7XG4gICAgfVxuICAgIGNvbnN0IGZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8UGFuZWxDb21wb25lbnQ+ID1cbiAgICAgIHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUGFuZWxDb21wb25lbnQpO1xuXG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIGNvbnN0IGRvbUVsZW0gPSAodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG4gICAgICAucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgdGhpcy5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLm92ZXJsYXkuaWQgPSBcIm5neC1jb2xvcnMtb3ZlcmxheVwiO1xuICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwibmd4LWNvbG9ycy1vdmVybGF5XCIpO1xuICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKG92ZXJsYXlDbGFzc05hbWUpO1xuICAgIE9iamVjdC5rZXlzKE9WRVJMQVlfU1RZTEVTKS5mb3JFYWNoKChhdHRyOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMub3ZlcmxheS5zdHlsZVthdHRyXSA9IE9WRVJMQVlfU1RZTEVTW2F0dHJdO1xuICAgIH0pO1xuICAgIGlmIChhdHRhY2hUbykge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXR0YWNoVG8pLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICB9XG4gICAgdGhpcy5vdmVybGF5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50UmVmO1xuICB9XG5cbiAgcmVtb3ZlUGFuZWwoKSB7XG4gICAgdGhpcy5hcHBsaWNhdGlvblJlZi5kZXRhY2hWaWV3KHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgdGhpcy5vdmVybGF5LnJlbW92ZSgpO1xuICB9XG59XG4iXX0=