import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Democart2Page } from './democart2.page';

const routes: Routes = [
  {
    path: '',
    component: Democart2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Democart2PageRoutingModule {}
