import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonitoringComponent } from "./monitoring.component";

const routes: Routes = [
  {
    path: "",
    component: MonitoringComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./list-monitoring/list-monitoring.module").then(
            (m) => m.ListMonitoringModule
          ),
      },
      {
        path: "detail/:id",
        loadChildren: () =>
          import("./bed-display/bed-display.module").then(
            (m) => m.BedDisplayModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoringRoutingModule {}
