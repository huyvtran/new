import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker/ngx'; 

import { toBase64String } from '@angular/compiler/src/output/source_map';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../rest.service';
import { Product } from '../Models/classModels';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  public forms:FormGroup;
public data: Product = new Product();
fileToUpload:File=null;
imageUrl:string="../../assets/images/arrow.png";
images:any=[];

  constructor(private fb:FormBuilder, public alertController: AlertController,public imagepicker:ImagePicker,private rest:RestService) { 
    this.forms = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      image: ['', Validators.required],
    

   
     
    });
   }
   
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      subHeader: 'Alert:',
      message: 'Please Confirm Before Posting.',
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
  }


add(){
   Object.assign(this.data, this.forms.value);
    console.log(this.data);

    if (this.forms.valid)  {
      this.rest.addProduct(this.data).subscribe((result) => {       
       
        if(result === undefined)
        {
          console.log(result);
         // this.errmsg=true;
        
        }
        else
        {
          
this.forms.reset();
this.presentAlert();
        
        }
        
      }, (err) => {
       // err.status(200).send("Error -> " + err);
      // this.server=true;
        console.log(err);
        //console.log(err);
      
      });
    }
    else
    {
      // alert("false");
    }
  }


  handleFileInput(file:FileList){
    this.fileToUpload=file.item(0);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  


}
