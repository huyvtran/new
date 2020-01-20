import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderNowPageRoutingModule } from './order-now-routing.module';

import { OrderNowPage } from './order-now.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderNowPageRoutingModule
  ],
  declarations: [OrderNowPage]
})
export class OrderNowPageModule {}
