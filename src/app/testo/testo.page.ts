import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { Product } from '../Models/classModels';
import { Location } from '@angular/common';

@Component({
  selector: 'app-testo',
  templateUrl: './testo.page.html',
  styleUrls: ['./testo.page.scss'],
})


export class TestoPage implements OnInit {
  productname: string;
  arr;
  listData: any;
  products: Product[] = [];
  service: any;
  count: any;
  userid: any;
  constructor(private rest: RestService, private popoverController: PopoverController, private _location: Location, private route: ActivatedRoute) { this.route.params.subscribe(params => this.doSearch(params)); }

  ngOnInit() {
    this.getcartdetails();
    this.retrieval();
  }

  backClicked() {
    this._location.back();
  }

  doSearch(param) {
    this.service = param.service;
  }

  getcartdetails() {
    this.rest.cartDetails().subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        this.count = this.arr[0].value;
      }
    }, (err) => {
      console.log(err);
    });
  }

  retrieval() {
    this.rest.getService(this.service).subscribe((Product) => {
      if (Product === undefined) {
        console.log(Product);
      }
      else {
        this.listData = Object.entries(Product).map(([type, value]) => ({ type, value }));
        this.products = this.listData[0].value;
      }
    }, (err) => {
      console.log(err);
    });
  }
}



