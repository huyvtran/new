import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';
import { AdmindashboardPageRoutingModule } from './admindashboard-routing.module';
import { AdmindashboardPage } from './admindashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ChartsModule,
    IonicModule,
    AdmindashboardPageRoutingModule
  ],
  declarations: [AdmindashboardPage]
})
export class AdmindashboardPageModule {}
