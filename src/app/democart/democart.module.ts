import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemocartPageRoutingModule } from './democart-routing.module';

import { DemocartPage } from './democart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemocartPageRoutingModule
  ],
  declarations: [DemocartPage]
})
export class DemocartPageModule {}
