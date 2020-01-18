import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  id: number;
  arr:any;
  userid:any;
  errmsg:any;
  name;
  price;
  discount;
  desc;
  image;
  
  constructor(private route: ActivatedRoute,   public rest: RestService) {
    this.route.params.subscribe(params => this.doSearch(params));
  
  }
  ngOnInit() {
    this.getProducts();
  }

  doSearch(param) {
    this.id = param.id;
    // console.log(this.id);
  }

  getProducts(){
    this.rest.getProduct(this.id).subscribe((result) => {

      if (result === undefined) {
        console.log(result);
        this.errmsg = true;
      }
      else {

        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        this.name=this.userid.name;
        this.price=this.userid.price;
        this.discount=this.userid.discount;
        this.desc=this.userid.desc;
        this.image=this.userid.image;
       console.log(this.userid);
       

      }

    }, (err) => {
    
      console.log(err);

    });
  }
}
