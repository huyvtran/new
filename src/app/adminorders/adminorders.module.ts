import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatTableModule} from '@angular/material/table';
import { IonicModule } from '@ionic/angular';

import { AdminordersPageRoutingModule } from './adminorders-routing.module';

import { AdminordersPage } from './adminorders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,NgxDatatableModule,MatTableModule,
    IonicModule,
    AdminordersPageRoutingModule
  ],
  declarations: [AdminordersPage]
})
export class AdminordersPageModule {}
