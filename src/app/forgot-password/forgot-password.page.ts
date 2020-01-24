import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Forgot } from '../Models/classModels';
import { RestService } from '../rest.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})

export class ForgotPasswordPage implements OnInit {
  public forms: FormGroup;
  showMsg: any;
  formValid: any;
  errmsg: any;
  valid: boolean = false;
  user: boolean = false;
  public data: Forgot = new Forgot();

  constructor(private fb: FormBuilder, private rest: RestService, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.forms = this.fb.group({
      phone_no: ["", [Validators.required]],
      password: ["", [Validators.required]],
      cpass: ["", [Validators.required]]
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
    this.valid = false;
    this.errmsg = false;
  }

  add() {
    Object.assign(this.data, this.forms.value);
    console.log(this.data);
    this.forms.get("password").setValidators(Validators.required);
    this.forms.get("password").updateValueAndValidity();
    this.forms.get("phone_no").setValidators(Validators.required);
    this.forms.get("phone_no").updateValueAndValidity();
    this.forms.get("cpass").setValidators(Validators.required);
    this.forms.get("cpass").updateValueAndValidity();
    this.forms.setValidators(this.passwordMatchValidator);
    this.forms.updateValueAndValidity();
    if (this.forms.valid) {
      this.rest.forgot(this.data).subscribe((result) => {
        if (result == undefined) {
          console.log(result)
          this.user = true;
        }
        else {
          this.confirm();
          this.forms.reset();
        }
      }, (err) => {
        this.user = true;
        console.log(err);
      });
    }
    else {
      this.valid = true;
    }
  }

  async confirm() {
    let alert = await this.alertCtrl.create({
      header: 'Congratulations!',
      message: 'You have Upadated Successfully',
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
}
