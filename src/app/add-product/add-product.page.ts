import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../rest.service';
import { Product, Property } from '../Models/classModels';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})

export class AddProductPage implements OnInit {
  public forms: FormGroup;
  public data: Product = new Product();
  public data1: Property = new Property();
  valid: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  image: any;
  public propertyforms: FormGroup;
  property: boolean = false;
  dashboard:boolean=false;
  admindashboard:boolean=false;
  prod: boolean = false;
  progress: { percentage: number } = { percentage: 0 };
  signup = {
    state: 0
  }
  statelist = [
    {
      state_id: 'Electronics',
      state_name: 'Electronics'
    },
    {
      state_id: 'Mobile&Tablets',
      state_name: 'Mobile&Tablets'
    },
    {
      state_id: 'Home_Appliances',
      state_name: 'Home_Appliances'
    },
    {
      state_id: 'Mobile_Accessory',
      state_name: 'Mobile_Accessory'
    },
    {
      state_id: 'Property',
      state_name: 'Property'
    }]

  constructor(private fb: FormBuilder, public navCtrl: NavController, public alertController: AlertController, public imagepicker: ImagePicker, private rest: RestService) {
    this.forms = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', Validators.required],
      sub: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      image: ['', [Validators.required]],
      image1: [''],
      image2: [''],
      image3: [''],
      image4: [''],
      status: '0',
      userId: this.rest.getId()
    });

    this.propertyforms = this.fb.group({
      propertyname: ['', [Validators.required]],
      category: ['', [Validators.required]],
      propertydesc: ['', [Validators.required]],
      propertyprice: ['', [Validators.required]],
      propertyimage: ['', [Validators.required]],
      propertyimage1: [''],
      propertyimage2: [''],
      propertyimage3: [''],
      propertyimage4: [''],
      status: '0',
      userId: this.rest.getId()
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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
  this.role();
    this.prod = true;
  }


  doRefresh(event) {
     //console.log('Begin async operation');
this.role();
    setTimeout(() => {
       //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  
  role(){
    if(this.rest.getRole()=="USER"){
      this.dashboard=true;
    }
    else{
      this.admindashboard=true;
    }
  }
  alert(signup) {
    if (signup.state == 'Property') {
      this.property = true;
      this.prod = false;
    }
    else {
      this.prod = true;
      this.property = false;
    }
  }

  selectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.image = this.currentFileUpload.name;
    console.log(this.currentFileUpload.name);
    this.rest.pushFileToStorages(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploadedss!');
      }
    });
    this.selectedFiles = undefined;
  }

  uploadpro() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.image = this.currentFileUpload.name;
    console.log(this.currentFileUpload.name);
    this.rest.property(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploadedss!');
      }
    });
    this.selectedFiles = undefined;
  }

  propertyAdd() {
    this.propertyforms.get("propertyname").setValidators(Validators.required);
    this.propertyforms.get("propertyname").updateValueAndValidity();
    this.propertyforms.get("propertydesc").setValidators(Validators.required);
    this.propertyforms.get("propertydesc").updateValueAndValidity();
    this.propertyforms.get("propertyprice").setValidators(Validators.required);
    this.propertyforms.get("propertyprice").updateValueAndValidity();
    this.propertyforms.get("propertyimage").setValidators(Validators.required);
    this.propertyforms.get("propertyimage").updateValueAndValidity();
    if (this.propertyforms.valid) {
      console.log('no error');
    }
    else {
      console.log('error');
      this.valid = true;
    }
    Object.assign(this.data1, this.propertyforms.value);
    console.log(this.data1);
    if (this.propertyforms.valid) {
      this.rest.addProperty(this.data1).subscribe((result) => {
        this.uploadpro();
        console.log(result);
        if (result === undefined) {
          console.log(result);
        }
        else {
          this.presentAlert();
          this.propertyforms.reset();
          this.propertyforms = this.fb.group({
            propertyname: ['', [Validators.required]],
            category: ['', [Validators.required]],
            propertydesc: ['', [Validators.required]],
            propertyprice: ['', [Validators.required]],
            propertyimage: ['', [Validators.required]],
            propertyimage1: [''],
            propertyimage2: [''],
            propertyimage3: [''],
            propertyimage4: [''],
            status: '0',
            userId: this.rest.getId()
          });
        }
      }, (err) => {
        console.log(err);
      });
    }
    else {
      alert("something Went Wrong");
    }
  }

  add() {
    this.forms.get("name").setValidators(Validators.required);
    this.forms.get("name").updateValueAndValidity();
    this.forms.get("price").setValidators(Validators.required);
    this.forms.get("price").updateValueAndValidity();
    this.forms.get("image").setValidators(Validators.required);
    this.forms.get("image").updateValueAndValidity();
    this.forms.get("sub").setValidators(Validators.required);
    this.forms.get("sub").updateValueAndValidity();
    this.forms.get("discount").setValidators(Validators.required);
    this.forms.get("discount").updateValueAndValidity();
    this.forms.get("desc").setValidators(Validators.required);
    this.forms.get("desc").updateValueAndValidity();
    if (this.forms.valid) {
      console.log('no error');
    }
    else {
      console.log('error');
      this.valid = true;
    }
    Object.assign(this.data, this.forms.value);
    console.log(this.data);
    if (this.forms.valid) {
      this.rest.addProduct(this.data).subscribe((result) => {
        this.upload();
        console.log(result);
        if (result === undefined) {
          console.log(result);
        }
        else {
          this.presentAlert();
          this.forms.reset();
          this.forms = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            sub: ['', Validators.required],
            desc: ['', Validators.required],
            price: ['', Validators.required],
            discount: ['', Validators.required],
            image: ['', Validators.required],
            image1: [''],
            image2: [''],
            image3: [''],
            image4: [''],
            status: '0',
            userId: this.rest.getId()
          });
        }
      }, (err) => {
        console.log(err);
      });
    }
    else {
      alert("something Went Wrong");
    }
  }
}
