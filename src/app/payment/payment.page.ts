import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Payment } from '../Models/classModels';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  modifyGroup:FormGroup;
  public data: Payment = new Payment();
  valid: boolean;
  show: boolean;

  constructor(private fb:FormBuilder,private rest:RestService) {
    this.modifyGroup = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      ccv: ["", [Validators.required]],
      month: ["", [Validators.required]],
      year: ["", [Validators.required]],
      line1: ["", [Validators.required]],
      card_no: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      postal_code: ["", [Validators.required]],
      price: ["", [Validators.required]],
      userId:this.rest.getId()
    });
  }

  ngOnInit() {
    this.valid=false;
this.show=false;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  
  add() {
     Object.assign(this.data, this.modifyGroup.value);
    console.log(this.data); 
    this.modifyGroup.get("ccv").setValidators(Validators.required);
    this.modifyGroup.get("ccv").updateValueAndValidity();
    this.modifyGroup.get("month").setValidators(Validators.required);
    this.modifyGroup.get("month").updateValueAndValidity();
    this.modifyGroup.get("year").setValidators(Validators.required);
    this.modifyGroup.get("year").updateValueAndValidity();
    this.modifyGroup.get("card_no").setValidators(Validators.required);
    this.modifyGroup.get("card_no").updateValueAndValidity();
    this.modifyGroup.get("price").setValidators(Validators.required);
    this.modifyGroup.get("price").updateValueAndValidity();
    this.modifyGroup.get("firstname").setValidators(Validators.required);
    this.modifyGroup.get("firstname").updateValueAndValidity();
    this.modifyGroup.get("lastname").setValidators(Validators.required);
    this.modifyGroup.get("lastname").updateValueAndValidity();
    this.modifyGroup.get("state").setValidators(Validators.required);
    this.modifyGroup.get("state").updateValueAndValidity(); 
       this.modifyGroup.get("city").setValidators(Validators.required);
    this.modifyGroup.get("city").updateValueAndValidity();  
      this.modifyGroup.get("line1").setValidators(Validators.required);
    this.modifyGroup.get("line1").updateValueAndValidity(); 
       this.modifyGroup.get("postal_code").setValidators(Validators.required);
    this.modifyGroup.get("postal_code").updateValueAndValidity();
    if (this.modifyGroup.valid) {
      this.rest.Payment(this.data).subscribe((result) => {
        if (result == undefined) {
          console.log(result)
        }
        else {
          this.modifyGroup.reset();
          this.show=true;
          this.modifyGroup = this.fb.group({
            firstname: ["", [Validators.required]],
            lastname: ["", [Validators.required]],
            ccv: ["", [Validators.required]],
            month: ["", [Validators.required]],
            year: ["", [Validators.required]],
            line1: ["", [Validators.required]],
            card_no: ["", [Validators.required]],
            city: ["", [Validators.required]],
            state: ["", [Validators.required]],
            postal_code: ["", [Validators.required]],
            price: ["", [Validators.required]],
            userId:this.rest.getId()
          });
        }
      }, (err) => {
        console.log(err);
      });
    }
    else {
      this.valid = true;
   
    }
  }


}
