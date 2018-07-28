import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent]
})
export class DashboardRoutingModule { }
