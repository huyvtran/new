import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { AddtoCart, Category } from '../Models/classModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-democart2',
  templateUrl: './democart2.page.html',
  styleUrls: ['./democart2.page.scss'],
})
export class Democart2Page implements OnInit {
  public data: AddtoCart = new AddtoCart();
  public form: FormGroup;
  cart;
  Quantity: any;
  carts;
  total: any;
  constructor(private rest: RestService, private fb: FormBuilder,private _location: Location) {
   
   }


  ngOnInit() {
    this.getCarList();
    this.getCarLists();
    this.Quantity = 0;
  }

  backClicked() {
    this._location.back();
  }


  getCarList() {
    this.rest.getCartList().subscribe((AddtoCart) => {

      if (AddtoCart === undefined) {
        console.log(AddtoCart);
      }
      else {
        this.cart = Object.entries(AddtoCart).map(([type, value]) => ({ type, value }));
        this.carts = this.cart[0].value;
       
      }
    }, (err) => {
      console.log(err);
    });
  }


  getCarLists() {
    this.rest.total().subscribe((AddtoCart) => {
      if (AddtoCart === undefined) {
        console.log(AddtoCart);
      }
      else {
        this.cart = Object.entries(AddtoCart).map(([type, value]) => ({ type, value }));
        this.total = this.cart[0].value;;
     
      }
    }, (err) => {
      console.log(err);
    });
  }



  add() {
    Object.assign(this.data)
    if(this.total>1){
    this.rest.AddtoOrder(this.data).subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
        console.log(result);
      }
    }, (err) => {
      console.log(err);
    });
  }
  else{
    alert('No Products');
  }
  }

}

