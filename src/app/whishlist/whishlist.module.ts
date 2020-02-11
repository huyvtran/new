import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatTableModule} from '@angular/material/table';
import { IonicModule } from '@ionic/angular';
import { WhishlistPageRoutingModule } from './whishlist-routing.module';
import { WhishlistPage } from './whishlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,MatTableModule,
    IonicModule,NgxDatatableModule,
    WhishlistPageRoutingModule
  ],
  declarations: [WhishlistPage]
})
export class WhishlistPageModule {}
