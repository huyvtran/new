import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {  Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators ,FormArray  } from '@angular/forms';
import { Register } from '../Models/classModels';
import { Roles } from '../Models/classModels';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  public modifyFormGroup : FormGroup;
  public formValid = true;
  flag:any;
  showMsg: boolean = false;
  errmsg:any;
  server: any;
  valid:boolean=false;
  valids:boolean=false;
  public data : Register = new Register();
  constructor(private fb: FormBuilder, private myRoute: Router,public rest:RestService) {
    this.modifyFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      email: ['', Validators.required],
      cpass: ['', Validators.required],
      roles: this.fb.array(['USER'])

   
     
    });
   }

  ngOnInit() {
this.valid=false;
this.valids=false;
  
    this.errmsg=false;
  }

  Register(){  
    this.modifyFormGroup.get("email").setValidators(Validators.required);
    this.modifyFormGroup.get("email").updateValueAndValidity();
    this.modifyFormGroup.get("username").setValidators(Validators.required);
    this.modifyFormGroup.get("username").updateValueAndValidity();
   
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
      this.valid=true;
      console.log("There is still an error in the form");
    }
      Object.assign(this.data, this.modifyFormGroup.value);
    console.log(this.data);

    if (this.modifyFormGroup.valid)  {
      this.rest.doRegister(this.data).subscribe((result) => {       
       
        if(result === undefined)
        {
          console.log(result);
          this.errmsg=true;
        
        }
        else
        {
          
this.modifyFormGroup.reset();
this.showMsg=true;
          this.myRoute.navigate(['/home']);
        }
        
      }, (err) => {
       // err.status(200).send("Error -> " + err);
      // this.server=true;
        this.modifyFormGroup.reset();
        //console.log(err);
      
      });
    }
    else
    {
      // alert("false");
    }
  }
  passwordMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get("password").value !==group.get("cpass").value) {
        return { notMatching : true };
      }
    }
   
    return null;
  }
  
 
}
