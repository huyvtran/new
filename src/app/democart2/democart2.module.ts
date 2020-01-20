import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Democart2PageRoutingModule } from './democart2-routing.module';

import { Democart2Page } from './democart2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Democart2PageRoutingModule
  ],
  declarations: [Democart2Page]
})
export class Democart2PageModule {}
