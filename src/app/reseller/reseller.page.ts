import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Reseller } from '../Models/classModels';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reseller',
  templateUrl: './reseller.page.html',
  styleUrls: ['./reseller.page.scss'],
})

export class ResellerPage implements OnInit {
  selectedFile: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  public modifyFormGroup: FormGroup;
  public formValid = true;
  flag: any;
  showMsg: boolean = false;
  errmsg: any;
  server: any;
  valid: boolean = false;
  valids: boolean = false;
  public data: Reseller = new Reseller();

  constructor(private fb: FormBuilder, public rest: RestService, private modalCtrl: ModalController,
    private alertCtrl: AlertController, private myRoute: Router) {
    this.modifyFormGroup = this.fb.group({
      Business_name: ['', [Validators.required]],
      owner_name: ['', Validators.required],
      owneraddress: ['', Validators.required],
      Email_address: ['', [Validators.required, Validators.email]],
      Gst_no: ['', Validators.required],
      phone_no: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      Registration_certificate: ['', Validators.required],
      GST_Certificate: [''],
      Pan_card: [''],
      Product_category: ['', Validators.required],
      complete_address: ['', Validators.required],
      cpass: ['', Validators.required],
      status: '0',
      password: ['', Validators.required],
      roles: this.fb.array(['USER']),
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
   
  }


  doRefresh(event) {
    console.log('Begin async operation');
    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  selectFile(event) {
    this.selectedFile = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile.item(0);
    this.rest.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.selectedFile = undefined;
  }

  async confirm() {
    let alert = await this.alertCtrl.create({
      header: 'Congratulations!',
      message: 'You have Register Successfully',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }

  passwordMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get("password").value !== group.get("cpass").value) {
        return { notMatching: true };
      }
    }
    return null;
  }

  register() {
    Object.assign(this.data, this.modifyFormGroup.value);
    console.log(this.data);
    this.modifyFormGroup.get("Business_name").setValidators(Validators.required);
    this.modifyFormGroup.get("Business_name").updateValueAndValidity();
    this.modifyFormGroup.get("owner_name").setValidators(Validators.required);
    this.modifyFormGroup.get("owner_name").updateValueAndValidity();
    this.modifyFormGroup.get("owneraddress").setValidators(Validators.required);
    this.modifyFormGroup.get("owneraddress").updateValueAndValidity();
    this.modifyFormGroup.get("Email_address").setValidators(Validators.required);
    this.modifyFormGroup.get("Email_address").updateValueAndValidity();
    this.modifyFormGroup.get("Gst_no").setValidators(Validators.required);
    this.modifyFormGroup.get("Gst_no").updateValueAndValidity();
    this.modifyFormGroup.get("phone_no").setValidators(Validators.required);
    this.modifyFormGroup.get("phone_no").updateValueAndValidity();
    this.modifyFormGroup.get("Registration_certificate").setValidators(Validators.required);
    this.modifyFormGroup.get("Registration_certificate").updateValueAndValidity();
    this.modifyFormGroup.get("Product_category").setValidators(Validators.required);
    this.modifyFormGroup.get("Product_category").updateValueAndValidity();
    this.modifyFormGroup.get("complete_address").setValidators(Validators.required);
    this.modifyFormGroup.get("complete_address").updateValueAndValidity();
    this.modifyFormGroup.get("password").setValidators(Validators.required);
    this.modifyFormGroup.get("password").updateValueAndValidity();
    this.modifyFormGroup.get("cpass").setValidators(Validators.required);
    this.modifyFormGroup.get("cpass").updateValueAndValidity();
    this.modifyFormGroup.setValidators(this.passwordMatchValidator);
    this.modifyFormGroup.updateValueAndValidity();
    if (this.modifyFormGroup.valid) {
      console.log("Form is valid");
    }
    else {
      this.valid = true;
      console.log("There is still an error in the form");
    }
    if (this.modifyFormGroup.valid) {
      this.upload();
      this.rest.Register(this.data).subscribe((result) => {
        if (result == undefined) {
          console.log(result);
        }
        else {
          alert('success');
        }
      }, (err) => {

        console.log(err);
        this.confirm();
        this.modifyFormGroup.reset();
        this.modifyFormGroup = this.fb.group({
          Business_name: ['', [Validators.required]],
          owner_name: ['', Validators.required],
          owneraddress: ['', Validators.required],
          Email_address: ['', [Validators.required, Validators.email]],
          Gst_no: ['', Validators.required],
          phone_no: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
          Registration_certificate: ['', Validators.required],
          GST_Certificate: [''],
          Pan_card: [''],
          cpass: ['', Validators.required],
          status: '0',
          password: ['', Validators.required],
          Product_category: ['', Validators.required],
          complete_address: ['', Validators.required],
          roles: this.fb.array(['USER'])
        });
      });
    }
  }
}
