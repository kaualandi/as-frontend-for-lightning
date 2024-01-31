import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MonitoringRoutingModule } from "./monitoring-routing.module";
import { MonitoringComponent } from "./monitoring.component";

import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "src/app/components/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
@NgModule({
  declarations: [MonitoringComponent],
  exports: [MonitoringComponent],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    MatSelectModule,
    MatTooltipModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    DragDropModule,
  ],

})
export class MonitoringModule {}
