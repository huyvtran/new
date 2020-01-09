import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResellerPageRoutingModule } from './reseller-routing.module';

import { ResellerPage } from './reseller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResellerPageRoutingModule
  ],
  declarations: [ResellerPage]
})
export class ResellerPageModule {}
