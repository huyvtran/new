import { Component,OnInit } from '@angular/core';

import { ActivatedRoute, Router ,Params} from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Login } from '../Models/classModels';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public modifyFormGroup : FormGroup;
  public data : Login = new Login();
  showMsg:any;
  formValid:any;
  errmsg:any;
  valid:boolean=false;
  server: any;
  constructor( private fb: FormBuilder,private myRoute: Router,public rest:RestService) {
    
  
this.modifyFormGroup = this.fb.group({
        username: ["", []],
        password:["", []]
      });
    
    }

  ngOnInit() {
    this.valid=false;
    this.errmsg=false;
  }
  
  login(){

    
  this.modifyFormGroup.get("username").setValidators(Validators.required);
  this.modifyFormGroup.get("username").updateValueAndValidity();
 
  this.modifyFormGroup.get("password").setValidators(Validators.required);
  this.modifyFormGroup.get("password").updateValueAndValidity();
  if (this.modifyFormGroup.valid) {
    console.log("Form is valid");
  }
  else {
    this.valid=true;
    console.log("There is still an error in the form");
  }

  /*this.rest.getuserdata(this.data).subscribe(
    (result) => {
      console.log(result);
    }
  ); 

}*/


Object.assign(this.data, this.modifyFormGroup.value);
console.log(this.data);

this.formValid=true;
this.formValid=true;



   if (this.formValid) {
    this.rest.login(this.data).subscribe((result) => {       
     console.log(result);
      if(result === undefined)
      {
        this.showMsg=true;
        console.log(result);
        this.errmsg=true;
      
      }
    else 
      {        
        this.rest.sendToken(result.accessToken);
      //this.rest.sendRole(result.role);
    
       // this.myRoute.navigateByUrl(this.returnUrl);
        this.myRoute.navigate(['/dashboard']);
      }
     
      
    }, (err) => {
     this.showMsg=true;
     
      console.log(err);
    
    });
  }
  else
  {
    alert("something Went Wrong");
  }
}



  }

