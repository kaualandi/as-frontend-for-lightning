import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMonitoringComponent } from './list-monitoring.component';

const routes: Routes = [{ path: '', component: ListMonitoringComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListMonitoringRoutingModule { }
