import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public modifyFormGroup : FormGroup;
  showMsg:any;
  formValid:any;
  errmsg:any;
  valid:boolean=false;
  constructor(private fb: FormBuilder) { 

  this.modifyFormGroup = this.fb.group({
    phone_no: ["", []],
    password:["", []],
    cpassword:["", []]
        });
      
      }
  
  

  ngOnInit() {
    this.valid=false;
    this.errmsg=false;
  }
  

  resetpassword(){
    this.modifyFormGroup.get("phone_no").setValidators(Validators.required);
  this.modifyFormGroup.get("phone_no").updateValueAndValidity();
  this.modifyFormGroup.get("password").setValidators(Validators.required);
  this.modifyFormGroup.get("password").updateValueAndValidity();
  this.modifyFormGroup.get("cpassword").setValidators(Validators.required);
  this.modifyFormGroup.get("cpassword").updateValueAndValidity();

  if (this.modifyFormGroup.valid) {
    console.log("Form is valid");
  }
  else {
    this.valid=true;
    console.log("There is still an error in the form");
  }

  }
}
