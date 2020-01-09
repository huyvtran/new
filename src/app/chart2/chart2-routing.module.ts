import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chart2Page } from './chart2.page';

const routes: Routes = [
  {
    path: '',
    component: Chart2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Chart2PageRoutingModule {}
