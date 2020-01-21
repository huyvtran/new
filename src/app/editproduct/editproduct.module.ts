import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditproductPageRoutingModule } from './editproduct-routing.module';
import { EditproductPage } from './editproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    EditproductPageRoutingModule
  ],
  declarations: [EditproductPage]
})
export class EditproductPageModule {}
