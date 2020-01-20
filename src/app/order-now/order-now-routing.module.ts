import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderNowPage } from './order-now.page';

const routes: Routes = [
  {
    path: '',
    component: OrderNowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderNowPageRoutingModule {}
