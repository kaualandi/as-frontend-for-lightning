import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../../shared/shared.module";
import { CardChannelComponent } from "./card-channel.component";

@NgModule({
  imports: [CommonModule, MatButtonModule, SharedModule],
  declarations: [CardChannelComponent],
  exports: [CardChannelComponent],
  providers: [DatePipe]
})
export class CardChannelShared {}
