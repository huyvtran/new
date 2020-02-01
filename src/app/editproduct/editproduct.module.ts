import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditproductPageRoutingModule } from './editproduct-routing.module';
import { EditproductPage } from './editproduct.page';
import { ProductListPage } from '../product-list/product-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    EditproductPageRoutingModule
  ],
  declarations: [EditproductPage],
  providers: [ProductListPage]
})
export class EditproductPageModule {}
