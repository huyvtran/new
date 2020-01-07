import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { TestoComponent } from '../testo/testo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,NgxDatatableModule,
    DashboardPageRoutingModule
  ],

  declarations: [DashboardPage]

})
export class DashboardPageModule {}
