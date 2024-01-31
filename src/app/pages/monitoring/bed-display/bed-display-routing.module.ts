import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BedDisplayComponent } from "./bed-display.component";

const routes: Routes = [
  {
    path: "",
    component: BedDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedDisplayRoutingModule {}
