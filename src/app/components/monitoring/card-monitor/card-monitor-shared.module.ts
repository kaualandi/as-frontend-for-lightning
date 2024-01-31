import { CommonModule, DatePipe } from "@angular/common";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { CardMonitorComponent } from "./card-monitor.component";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../../shared/shared.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ChannelModule } from "../channel/channel-shared.module";
import { ListChannelsShared } from "../list-channels/list-channels-shared.module";
import { CardChannelShared } from "../card-channel/card-channel-shared.module";
import { CardModeCurvesComponent } from "../card-mode-curves/card-mode-curves.component";
import { MatMenuModule } from "@angular/material/menu";
@NgModule({
  declarations: [CardMonitorComponent, CardModeCurvesComponent],
  exports: [CardMonitorComponent, CardModeCurvesComponent],
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
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    ChannelModule,
    TranslateModule.forChild(),
    MatTooltipModule,
    ListChannelsShared,
    CardChannelShared,
    MatMenuModule,
  ],
})
export class CardSharedModule {}
