import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListMonitoringRoutingModule } from "./list-monitoring-routing.module";
import { ListMonitoringComponent } from "./list-monitoring.component";
import { SharedModule } from "src/app/components/shared/shared.module";
import { CardSharedModule } from "src/app/components/monitoring/card-monitor/card-monitor-shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { CardChannelShared } from "src/app/components/monitoring/card-channel/card-channel-shared.module";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [ListMonitoringComponent],
  exports: [ListMonitoringComponent],
  imports: [
    CommonModule,
    ListMonitoringRoutingModule,
    SharedModule,
    CardSharedModule,
    CardChannelShared,
    TranslateModule.forChild(),
    DragDropModule,
  ],

})
export class ListMonitoringModule {}
