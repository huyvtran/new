import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,NgxDatatableModule,
    DashboardPageRoutingModule
  ],

  declarations: [DashboardPage],

})
export class DashboardPageModule {}
