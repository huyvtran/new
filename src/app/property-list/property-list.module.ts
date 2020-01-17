import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PropertyListPageRoutingModule } from './property-list-routing.module';
import { PropertyListPage } from './property-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,NgxDatatableModule,MatTableModule,
    PropertyListPageRoutingModule
  ],
  declarations: [PropertyListPage]
})
export class PropertyListPageModule {}
