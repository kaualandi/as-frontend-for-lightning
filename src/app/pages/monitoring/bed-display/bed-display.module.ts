import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BedDisplayRoutingModule } from "./bed-display-routing.module";
import { BedDisplayComponent } from "./bed-display.component";
import { SharedModule } from "src/app/components/shared/shared.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { ChannelModule } from "src/app/components/monitoring/channel/channel-shared.module";
import { NgxMaskModule } from "ngx-mask";
import { ListChannelsShared } from "src/app/components/monitoring/list-channels/list-channels-shared.module";

@NgModule({
  declarations: [BedDisplayComponent],
  imports: [
    CommonModule,
    BedDisplayRoutingModule,
    SharedModule,
    MatTooltipModule,
    TranslateModule.forChild(),
    ChannelModule,
    ListChannelsShared,
    NgxMaskModule.forRoot()
  ]
})
export class BedDisplayModule {}
