import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { UnauthGuard } from "./guards/unauth.guard";
import { CurvesComponent } from "./pages/curves/curves.component";

const SPR = false;

const routes: Routes = [
  {
    path: "login",
    canActivate: [UnauthGuard],
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "",
    component: NavbarComponent,
    // canActivate: [AuthGuard], // * Caso o projeto tenha rotas sem auth além de login, remover essa linha.
    children: [
      { path: "", redirectTo: "monitoring", pathMatch: "full" },
      {
        path: "monitoring",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./pages/monitoring/monitoring.module").then(
            (m) => m.MonitoringModule
          ),
      },
      {
        path: "patient-display/:id",
        canActivate: [AuthGuard /* AdminGuard */],
        loadChildren: () =>
          import("./pages/patient-display/patient-display.module").then(
            (m) => m.PatientDisplayModule
          ),
      },
      {
        path: "curves",
        component: CurvesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: SPR ? "enabled" : "disabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
