import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Category } from '../Models/classModels';
import { Location } from '@angular/common';
@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.page.html',
  styleUrls: ['./all-category.page.scss'],
})
export class AllCategoryPage implements OnInit {
  categorys: Category[] = [];
  arr;
  userid;
  count;

  constructor(private rest:RestService, private _location: Location) { }

  ngOnInit() {
    this.getcartdetails();
    this.retrieval();
  }

  backClicked() {
    this._location.back();
  }

  retrieval() {
    this.rest.getCategory().subscribe((Category) => {

      if (Category === undefined) {
     console.log(Category);

      }
      else {

        this.categorys = Category.category;
        console.log(this.categorys);
      }
    }, (err) => {
       console.log(err);

    });

  }
  
  doRefresh(event) {
     //console.log('Begin async operation');
this.getcartdetails();
this.retrieval();
    setTimeout(() => {
       //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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

}
