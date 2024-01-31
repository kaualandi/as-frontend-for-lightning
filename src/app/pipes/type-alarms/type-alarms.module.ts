import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { TypeAlarmsPipe } from "../type-alarms/type-alarms.pipe";

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [TypeAlarmsPipe],
  exports: [TypeAlarmsPipe],
})
export class TypeAlarmsShared {}
