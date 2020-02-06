import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../rest.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Reseller } from '../Models/classModels';
import { UserProfilePage } from '../user-profile/user-profile.page';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
public forms:FormGroup;
valid: boolean = false;
selectedFiles: FileList;
currentFileUpload: File;
image: any;
imageUrl:File;
public data: Reseller = new Reseller();
userid;
arr;
ar;
role;
listData;
owner_name;
business_name:string ='';
Email_address;
phone_no;
web_address;
wallet;
balance;
owner_address;
photo;
dashboard:boolean=false;
admindashboard:boolean=false;
progress: { percentage: number } = { percentage: 0 };

  constructor(private alertController:AlertController,private test:UserProfilePage, private _location: Location,private fb:FormBuilder,private rest:RestService){ }

  ngOnInit() {
    this.roles();
    this.vali();
    this.getuserDetails();
  }

  
  doRefresh(event) {
     //console.log('Begin async operation');

  this.getuserDetails();
    setTimeout(() => {
       //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  vali(){
    this.forms = this.fb.group({
      Email_address: ['', [Validators.required]],
      phone_no: ['', [Validators.required]],
      owner_name:  ['', [Validators.required]],
      owner_address: ['', [Validators.required]],
      business_name: ['', [Validators.required]],
       photo:['', [Validators.required]]
    });
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  backClicked() {
    this._location.back();
  }

  
  selectFiles(event) {
    this.selectedFiles = event.target.files;
    this.imageUrl=this.selectedFiles.item(0);
  }


  upload() {
 
    this.currentFileUpload = this.selectedFiles.item(0);
    this.image = this.currentFileUpload.name;
    console.log(this.currentFileUpload.name);
    this.rest.profile(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
     this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploadedss!');
      }
    });
    this.selectedFiles = undefined;
  }

  
  roles(){
    if(this.rest.getRole()=="USER"){
      this.dashboard=true;
    }
    else{
      this.admindashboard=true;
    }
  }


  update(){

    this.forms.get("Email_address").setValidators(Validators.required);
    this.forms.get("Email_address").updateValueAndValidity();
    this.forms.get("phone_no").setValidators(Validators.required);
    this.forms.get("phone_no").updateValueAndValidity();
    this.forms.get("owner_name").setValidators(Validators.required);
    this.forms.get("owner_name").updateValueAndValidity();
    this.forms.get("owner_address").setValidators(Validators.required);
    this.forms.get("owner_address").updateValueAndValidity();
    this.forms.get("business_name").setValidators(Validators.required);
    this.forms.get("business_name").updateValueAndValidity();
    
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
      this.rest.UpdateRegister(this.data).subscribe((result) => {
        this.upload();
        console.log(result);
        if (result === undefined) {
          console.log(result);
        }
        else {
          this.presentAlert();
         
         this.getuserDetails();
         
        }
      }, (err) => {
        console.log(err);
      });
    }
    else {
      alert("something Went Wrong");
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Profile updated',
      buttons: ['OK']
    });
    await alert.present();
  }

  getuserDetails() {
    this.rest.userprofile().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
       // this.errmsg = true;
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        console.log(this.userid);
        this.owner_name = this.userid.owner_name;
        this.business_name = this.userid.business_name;
        this.Email_address = this.userid.Email_address;
        this.phone_no = this.userid.phone_no;
        this.photo = this.userid.photo;
        this.owner_address = this.userid.owneraddress;
    
    
 

      }
    }, (err) => {
      console.log(err);
    });
  }

  }


