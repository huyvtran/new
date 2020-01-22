import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { AddtoCart, Category } from '../Models/classModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-democart2',
  templateUrl: './democart2.page.html',
  styleUrls: ['./democart2.page.scss'],
})
export class Democart2Page implements OnInit {
  public data: AddtoCart = new AddtoCart();
  public form:FormGroup;
 
cart;
Quantity:any;

carts;
total:any;
  constructor(private rest:RestService,private fb: FormBuilder) {
    this.form = this.fb.group({
      price:['',Validators.required],
      name:[''],
      total:[''],
      image:[''],
      quantity:[''],
        });
   }


  ngOnInit() {
  this.getCarList();
  this.Quantity=0;
  this.total=0;
}

plus(){
  this.Quantity++;
 // this.total=this.Quantity*this.price;
  console.log(this.Quantity);
}

async minus(){
  
  this.Quantity--;
  //this.total=this.Quantity*this.price;

  if(this.Quantity<0){
    this.Quantity=0;
    this.total=0;
  }
}

  getCarList(){
    this.rest.getCartList().subscribe((AddtoCart) => {       
       
      if(AddtoCart === undefined)
      {
        console.log(AddtoCart);
      }
      else
      {
        this.cart = Object.entries(AddtoCart).map(([type, value]) => ({ type, value }));
        this.carts = this.cart[0].value;
   
       
  
   console.log(this.form.patchValue(this.data));
   console.log(this.form.patchValue(this.carts));
      }      
    }, (err) => {
      console.log(err);
    
    });
  }


   add(){
    Object.assign(this.data, this.form.value);
  console.log(this.data);
  if(this.total>1){
  if (this.form.valid) {
    this.rest.order(this.data).subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
        alert('success');
      }
    }, (err) => {
      console.log(err);
    });
  }
}
else{
  alert('Empty Value');

}
}
   
}
