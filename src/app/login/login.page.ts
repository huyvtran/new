import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Login } from '../Models/classModels';
import { AlertController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public modifyFormGroup: FormGroup;
  public data: Login = new Login();
  showMsg: any;
  formValid: any;
  errmsg: any;
  valid: boolean = false;
  server: any;
  suu: boolean = true;
  subscribe:any;
  constructor(public platform:Platform ,private fb: FormBuilder, private myRoute: Router, public rest: RestService,
     private modalCtrl: ModalController,
    private alertCtrl: AlertController) {
    this.modifyFormGroup = this.fb.group({
      Email_address: ["", []],
      password: ["", []]
    });

    // this.subscribe=this.platform.backButton.subscribeWithPriority(6666)
  }

  

  ngOnInit() {
    this.valid = false;
    this.errmsg = false;
  }

  async confirm() {
    let alert = await this.alertCtrl.create({
      message: 'Successfully Logged In',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }

  login() {
    this.modifyFormGroup.get("password").setValidators(Validators.required);
    this.modifyFormGroup.get("password").updateValueAndValidity();
    this.modifyFormGroup.get("Email_address").setValidators(Validators.required);
    this.modifyFormGroup.get("Email_address").updateValueAndValidity();
    if (this.modifyFormGroup.valid) {
      console.log("Form is valid");
    }
    else {
      this.valid = true;
      console.log("There is still an error in the form");
    }
    Object.assign(this.data, this.modifyFormGroup.value);
    console.log(this.data);
    this.formValid = true;
    this.formValid = true;
    if (this.formValid) {
      this.rest.login(this.data).subscribe((result) => {
        console.log(result);
        if (result === undefined) {
          this.showMsg = true;
          console.log(result);
          this.errmsg = true;
        }
        else {
          this.confirm();
          this.rest.sendToken(result.accessToken);
          this.myRoute.navigate(['/dashboard']);
          this.modifyFormGroup.reset();
        }
      }, (err) => {
        this.showMsg = true;
        console.log(err);
      });
    }
    else {
      alert("something Went Wrong");
    }
  }
}

