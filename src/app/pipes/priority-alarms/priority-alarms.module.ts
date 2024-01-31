import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { PriorityAlarmsPipe } from "./priority-alarms.pipe";

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [PriorityAlarmsPipe],
  exports: [PriorityAlarmsPipe],
})
export class PriorityAlarmsShared {}
