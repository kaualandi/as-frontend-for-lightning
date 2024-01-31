import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PatientDisplayComponent } from "./patient-display.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { MonitoringComponent } from "../monitoring/monitoring.component";

const routes: Routes = [
  {
    path: "",
    component: PatientDisplayComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../monitoring/list-monitoring/list-monitoring.module").then(
            (m) => m.ListMonitoringModule
          ),
      },
    ],
  },
  {
    path: "monitoring",
    component: MonitoringComponent,
    children: [
      {
        path: "detail/:id",
        loadChildren: () =>
          import("../monitoring/bed-display/bed-display.module").then(
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
export class PatientDisplayRoutingModule {}
