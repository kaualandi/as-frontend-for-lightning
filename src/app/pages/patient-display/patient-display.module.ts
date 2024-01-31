import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { PatientDisplayRoutingModule } from "./patient-display-routing.module";
import { PatientDisplayComponent } from "./patient-display.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "src/app/components/shared/shared.module";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MonitoringModule } from "../monitoring/monitoring.module";
import { BedDisplayModule } from "../monitoring/bed-display/bed-display.module";
import { CardSharedModule } from "src/app/components/monitoring/card-monitor/card-monitor-shared.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { PriorityAlarmsShared } from "src/app/pipes/priority-alarms/priority-alarms.module";
import { TypeAlarmsShared } from "src/app/pipes/type-alarms/type-alarms.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [PatientDisplayComponent],
  imports: [
    CommonModule,
    PatientDisplayRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    SharedModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatCardModule,
    MatTabsModule,
    MonitoringModule,
    BedDisplayModule,
    CardSharedModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PriorityAlarmsShared,
    TypeAlarmsShared,
    TranslateModule.forChild(),
    MatExpansionModule,
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: LOCALE_ID, useValue: "pt" },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "BRL",
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class PatientDisplayModule {}
