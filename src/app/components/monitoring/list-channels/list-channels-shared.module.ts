import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../../shared/shared.module";
import { ListChannelsComponent } from "./list-channels.component";
import { CardChannelShared } from "../card-channel/card-channel-shared.module";

@NgModule({
  imports: [CommonModule, MatButtonModule, SharedModule, CardChannelShared],
  declarations: [ListChannelsComponent],
  exports: [ListChannelsComponent],
  providers: [DatePipe]
})
export class ListChannelsShared {}
