import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResellerPage } from './reseller.page';

const routes: Routes = [
  {
    path: '',
    component: ResellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResellerPageRoutingModule {}
