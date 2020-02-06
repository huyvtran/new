import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
arr;
states;

constructor(private rest:RestService) {}

ngOnInit(){
  this.getProductName();
}


getProductName(){
  this.rest.productname().subscribe((result) => {
    if (result == undefined) {
      console.log(result);
    }
    else {
  this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
      this.states = this.arr[0].value;
 
     console.log(this.states)
    }
  }, (err) => {
    console.log(err);
  });
}
}
