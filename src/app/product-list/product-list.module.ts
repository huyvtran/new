import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListPageRoutingModule } from './product-list-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatTableModule} from '@angular/material/table';
import { ProductListPage } from './product-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,NgxDatatableModule,
    IonicModule,MatTableModule,
    ProductListPageRoutingModule
  ],
  declarations: [ProductListPage],
  
})
export class ProductListPageModule {}
