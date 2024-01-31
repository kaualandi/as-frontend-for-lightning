import { NgModule } from "@angular/core";
import { NgxColorsComponent } from "./ngx-colors.component";
import { CommonModule } from "@angular/common";
import { ColorPickerComponent } from "./components/color-picker/color-picker.component";
import { ConverterService } from "./services/converter.service";
import { SliderDirective } from "./directives/slider.directive";
import { PanelComponent } from "./components/panel/panel.component";
import { PanelFactoryService } from "./services/panel-factory.service";
import { NgxColorsTriggerDirective } from "./directives/ngx-colors-trigger.directive";
import * as i0 from "@angular/core";
export class NgxColorsModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbG9ycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY29sb3JzL3NyYy9saWIvbmd4LWNvbG9ycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7QUFjdEYsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFWeEIsa0JBQWtCO1FBQ2xCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2YsY0FBYztRQUNkLHlCQUF5QixhQUVqQixZQUFZLGFBRVosa0JBQWtCLEVBQUUseUJBQXlCOzZHQUU1QyxlQUFlLGFBSGYsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxZQUR4QyxZQUFZOzJGQUlYLGVBQWU7a0JBWjNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGtCQUFrQjt3QkFDbEIsb0JBQW9CO3dCQUNwQixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QseUJBQXlCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDO29CQUNsRCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSx5QkFBeUIsQ0FBQztpQkFDekQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOZ3hDb2xvcnNDb21wb25lbnQgfSBmcm9tIFwiLi9uZ3gtY29sb3JzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zXCI7XG5pbXBvcnQgeyBDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbnZlcnRlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jb252ZXJ0ZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgU2xpZGVyRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9zbGlkZXIuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBQYW5lbENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQYW5lbEZhY3RvcnlTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvcGFuZWwtZmFjdG9yeS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBOZ3hDb2xvcnNUcmlnZ2VyRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9uZ3gtY29sb3JzLXRyaWdnZXIuZGlyZWN0aXZlXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neENvbG9yc0NvbXBvbmVudCxcbiAgICBDb2xvclBpY2tlckNvbXBvbmVudCxcbiAgICBTbGlkZXJEaXJlY3RpdmUsXG4gICAgUGFuZWxDb21wb25lbnQsXG4gICAgTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0NvbnZlcnRlclNlcnZpY2UsIFBhbmVsRmFjdG9yeVNlcnZpY2VdLFxuICBleHBvcnRzOiBbTmd4Q29sb3JzQ29tcG9uZW50LCBOZ3hDb2xvcnNUcmlnZ2VyRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4Q29sb3JzTW9kdWxlIHt9XG4iXX0=