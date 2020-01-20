import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemocartPage } from './democart.page';

const routes: Routes = [
  {
    path: '',
    component: DemocartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemocartPageRoutingModule {}
