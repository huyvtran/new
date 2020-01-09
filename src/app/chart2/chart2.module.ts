import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Chart2PageRoutingModule } from './chart2-routing.module';

import { Chart2Page } from './chart2.page';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Chart2PageRoutingModule,
    ChartsModule
  ],
  declarations: [Chart2Page]
})
export class Chart2PageModule {}
