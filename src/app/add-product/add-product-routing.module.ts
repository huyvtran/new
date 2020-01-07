import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx'; 
import { AddProductPage } from './add-product.page';
import { File } from '@ionic-native/file/ngx';
const routes: Routes = [
  {
    path: '',
    component: AddProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[ImagePicker,File]
})
export class AddProductPageRoutingModule {}
