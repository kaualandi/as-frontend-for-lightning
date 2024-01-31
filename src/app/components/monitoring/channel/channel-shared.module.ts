import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../../shared/shared.module";
import { ChannelComponent } from "./channel.component";

@NgModule({
  imports: [CommonModule, MatButtonModule, SharedModule],
  declarations: [ChannelComponent],
  exports: [ChannelComponent],
  providers: [DatePipe]
})
export class ChannelModule {}
