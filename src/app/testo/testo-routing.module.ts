import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestoPage } from './testo.page';

const routes: Routes = [
  {
    path: '',
    component: TestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestoPageRoutingModule {}
