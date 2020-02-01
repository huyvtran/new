import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../rest.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Reseller } from '../Models/classModels';


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
owneraddress;
web_address;
wallet;
balance;




progress: { percentage: number } = { percentage: 0 };

  constructor( private _location: Location,private fb:FormBuilder,private rest:RestService,) {
   
   }

  ngOnInit() {
    this.vali();
    this.getuserDetails();
  }


  vali(){
    this.forms = this.fb.group({
      Email_address: localStorage.getItem("email"),
      phone_no: localStorage.getItem("pho"),
      owner_name:  localStorage.getItem("ownnamw"),
      owner_address: localStorage.getItem("ownadd"),
      business_name: localStorage.getItem("businame"),
       photo: ["", [Validators.required]],
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
    this.rest.pushFileToStorages(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
     this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploadedss!');
      }
    });
    this.selectedFiles = undefined;
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
          //this.presentAlert();
          this.forms.reset();
         
        }
      }, (err) => {
        console.log(err);
      });
    }
    else {
      alert("something Went Wrong");
    }
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
        this.owneraddress = this.userid.owneraddress;
        console.log(this.userid.owneraddress);
        this.wallet = this.userid.Wallet;
        localStorage.setItem("email",this.Email_address);
        localStorage.setItem("pho",this.phone_no);
        localStorage.setItem("ownnamw",this.owner_name);
        localStorage.setItem("ownadd",this.owneraddress);
        localStorage.setItem("businame",this.business_name);
        
        

      }
    }, (err) => {
      console.log(err);
    });
  }

  }


