import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {  Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators ,FormArray  } from '@angular/forms';
import { Register } from '../Models/classModels';
import { ModalController, AlertController } from '@ionic/angular';

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
  constructor(private fb: FormBuilder, private modalCtrl: ModalController,private alertCtrl: AlertController, private myRoute: Router,public rest:RestService) {
    this.modifyFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      email: ['', Validators.required],
      cpass: ['', Validators.required],
      roles: this.fb.array(['ADMIN'])

   
     
    });
   }

  ngOnInit() {
this.valid=false;
this.valids=false;
  
    this.errmsg=false;
  }

  async Register(){  
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
          


          this.myRoute.navigate(['/login']);
        }
        
      }, (err) => {
       // err.status(200).send("Error -> " + err);
       this.showMsg=true;
     
     
        this.modifyFormGroup.reset();
       // console.log(err);
      
      });
    }
    else
    {
      // alert("false");
    }

   //Dialog Box On SuccessFull Register
   if(this.showMsg=true){
      let alert = await this.alertCtrl.create({
        header: 'Congratulations!',
        message: 'You have Register Successfully',
        buttons: ['OK']
    
      
      
     
      });
      alert.present().then(() => {
        this.modalCtrl.dismiss();
      });
    
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
