import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestoPageRoutingModule } from './testo-routing.module';

import { TestoPage } from './testo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestoPageRoutingModule
  ],
  declarations: [TestoPage]
})
export class TestoPageModule {}
