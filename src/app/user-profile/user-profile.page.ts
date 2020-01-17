import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Register } from '../Models/classModels';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  errmsg:boolean=false;

  userid;
  arr;
  ar;
  role;
  listData;
  owner_name;
  business_name;
  Email_address;
  phone_no;
  owneraddress;
  web_address;
  wallet;
  balance;

  public modifyFormGroup: FormGroup;
  public data : Register = new Register();

  
  constructor(private fb: FormBuilder,public rest:RestService) {
    this.modifyFormGroup = this.fb.group({
   
      owner_name: ['', Validators.required],
   

   
     
    });
   }
  ngOnInit() {
   this.getuserDetails();
  }    


  getuserDetails(){
    this.rest.userprofile().subscribe((result) => {       
       
      if(result === undefined)
      {
        console.log(result);
        this.errmsg=true;    
      }
      else
      {
   
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
      this.userid = this.arr[0].value;
      console.log(this.userid);
this.owner_name=this.userid.owner_name;
this.business_name=this.userid.business_name;
this.Email_address=this.userid.Email_address;
this.phone_no=this.userid.phone_no;
this.owneraddress=this.userid.owneraddress;
 this.wallet=this.userid.Wallet;
    
console.log(this.wallet= this.userid.Wallet);
      /* to get role of user */

   
    
      }
      
    }, (err) => {
      console.log(err);
    
    });
  }
}
